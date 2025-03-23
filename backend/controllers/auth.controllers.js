const User = require("../models/User.js");
const OTP = require("../models/OTP.js");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sendSms = require("../utils/sendSms");

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP controller
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    console.log("phone : ",phone);

    // Validate request body
    if (!phone || phone === "") {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Hash the OTP before saving
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { phone },
      { phone, otp: hashedOTP },
      { upsert: true, new: true }
    );

    // Send OTP via Twilio
    const messageResponce = await sendSms(phone, `Your OTP for signup in Urban Aid is: ${otp}. it will be only Valid for 10 minutes.`);
    console.log("messageResponce : ",messageResponce);
    // Send response
    return res.status(200).json({
      success: true,
      message: "OTP sent to your phone successfully",
      otp: process.env.NODE_ENV === "development" ? otp : undefined
    });
  } catch (error) {
    console.error("Error in sendOtp:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Verify OTP controller
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validate request body
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    // Find the OTP document
    const otpDoc = await OTP.findOne({ phone });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired. Please request a new OTP.",
      });
    }

    // Verify OTP
    const isOtpValid = await bcrypt.compare(otp, otpDoc.otp);
    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // Mark OTP as verified
    await OTP.findOneAndUpdate(
      { phone },
      { is_verified: true },
      { new: true }
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });
  } catch (error) {
    console.error("Error in verifyOtp:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.signup = async (req, res) => {
    try {
        const {fullname, phone, email, gender, role, city, state, country, pincode, password} = req.body;

        // Check if all required fields are provided
        if (!fullname || !phone || !email || !gender || !city || !state || !country || !pincode || !password) {
          return res.status(403).json({
            success: false,
            message: "All Fields are required",
          });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          });
        }

        // Verify if OTP verification was completed
        const otpDoc = await OTP.findOne({ phone });
        if (!otpDoc) {
          return res.status(400).json({
            success: false,
            message: "OTP verification required before signup.",
          });
        }

        // Check if OTP is verified
        if (!otpDoc.is_verified) {
          return res.status(400).json({
            success: false,
            message: "Phone number not verified. Please verify your phone number first.",
          });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
          fullname,
          phone,
          email,
          password: hashedPassword,
          role,
          gender,
          city,
          state,
          country,
          pincode,
        });
    
        // Delete the OTP document since signup is complete
        await OTP.findOneAndDelete({ phone });

        return res.status(200).json({
          success: true,
          user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
          message: "User registered successfully",
        });
      } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        });
      }
}

exports.signin = async (req, res) => {
  try {
    const { phone,email, password } = req.body;

    const identifier = phone || email;

    if(identifier == email){
      const userEmail = await User.findOne({ email });
      if(userEmail.is_email_verified == false){
        return res.status(400).json({
          success: false,
          message: "Email not verified. Please verify your email first.",
        });
      }
    }

    // Validate request body
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone number or email and password are required",
      });
    }

    console.log("identifier : ",identifier);

    // Find the user
    const user = await User.findOne({ $or: [{ phone:identifier }, { email:identifier }] });
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your phone number or sign up.",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please check your password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role,
        phone: user.phone,
        fullname: user.fullname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie with token
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Return success response
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      message: "Signed in successfully",
    });
  } catch (error) {
    console.error("Error in signin:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

