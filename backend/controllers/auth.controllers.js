const User = require("../models/User.js");

exports.signup = async (req, res) => {
    try {
        const {fullname,phone,email,password,gender,role,city,state,country,pincode} = req.body

        if (!fullname || !phone || !email || !password || !gender || !city || !state || !country || !pincode) 
        {
          return res.status(403).json({
            success: false,
            message: "All Fields are required",
          })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{email}, {phone}] })
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          })
        }
    
        // Find the most recent OTP for the email
        const response = await OTP.find({ $or: [{email}, {phone}] }).sort({ createdAt: -1 }).limit(1)
        console.log(response)
        if (response.length <= 0) {
          return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
          })
        } else if (otp !== response[0].otp) {
          return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
          })
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
          fullname,
          phone,
          email,
          password: hashedPassword,
          role,
          is_verified: true,
          image: "",
        })
    
        return res.status(200).json({
          success: true,
          user,
          message: "User registered successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
      }
}

exports.signin = async (req, res) => {

}

