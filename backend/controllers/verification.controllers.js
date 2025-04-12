const User = require("../models/User");
const VendorProfile = require("../models/VendorProfile");
const VendorVerification = require("../models/VendorVerification");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const { uploadFile, deleteFile } = require("../utils/fileUpload");
const sendSms = require("../utils/sendSms");
const sendEmail = require("../utils/sendEmail");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendEmailVerificationOTP = async (req, res) => {
  try {
    const { id } = req.user;
    
    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Check if email is already verified
    if (user.is_email_verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const email = user.email;
    
    // Generate OTP
    const otp = generateOTP();
    
    // Hash the OTP before saving
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Create a proper HTML email template
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; }
          .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { padding: 20px; }
          .otp-box { font-size: 24px; font-weight: bold; text-align: center; padding: 10px; margin: 20px 0; background-color: #f5f5f5; border-radius: 5px; letter-spacing: 5px; }
          .footer { font-size: 12px; text-align: center; margin-top: 20px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Urban Aid Email Verification</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for registering with Urban Aid. Please use the following OTP to verify your email address:</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP is valid for 10 minutes only.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Urban Aid. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // send otp to email
    const emailResponse = await sendEmail(
      email, 
      emailTemplate,
      "Urban Aid - Email Verification OTP"
    );

    // Check if email was sent successfully
    if (!emailResponse.success) {
      console.error("Failed to send OTP email:", emailResponse.error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again.",
        error: emailResponse.error
      });
    }

    // Save OTP to database with email as identifier
    await OTP.findOneAndUpdate(
      { email: email },
      { email: email, otp: hashedOTP },
      { upsert: true, new: true }
    );
    
    // Send response
    return res.status(200).json({
      success: true,
      message: "OTP sent to your email successfully",
      otp: process.env.NODE_ENV === "development" ? otp : undefined
    });
  } catch (error) {
    console.error("Error in sendEmailVerificationOTP:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { id } = req.user;
    const { otp } = req.body;

    // Validate request body
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is a vendor
    if (user.role !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Only vendors can access this resource",
      });
    }

    // Check if email is already verified
    if (user.is_email_verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const email = user.email;

    // Find the OTP document and get the latest OTP
    const otpDoc = await OTP.findOne({ email: email }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired. Please request a new OTP.",
      });
    }

    // Check if OTP is expired (more than 10 minutes old)
    const otpCreationTime = new Date(otpDoc.createdAt).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = (currentTime - otpCreationTime) / (1000 * 60); // in minutes
    
    if (timeDifference > 10) {
      // Delete expired OTP document
      await OTP.findOneAndDelete({ email: email });
      
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
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

    // Mark email as verified
    user.is_email_verified = true;
    await user.save();

    // Delete the OTP document since verification is complete
    await OTP.findOneAndDelete({ email: email });

    // Check if there's a vendor verification record and update status if needed
    const vendorVerification = await VendorVerification.findOne({ user: id });
    if (vendorVerification) {
      // Only update to 'requested' if identity has been submitted
      if (vendorVerification.identity_proof && vendorVerification.verification_status === "pending") {
        vendorVerification.verification_status = "requested";
        vendorVerification.verification_requested_at = new Date();
        await vendorVerification.save();
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    console.error("Error in verifyEmail:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.verifyIdentity = async (req, res) => {
  try {
    const { id } = req.user;
    const { fullname, identity_type, identity_number } = req.body;

    // Find the user    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is a vendor
    if (user.role !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Only vendors can access this resource",
      });
    }

    // Validation
    if (!fullname || !identity_type || !identity_number) {
      return res.status(400).json({
        success: false,
        message: "Fullname, identity type, and identity number are required",
      });
    }

    // Check identity type
    const validIdentityTypes = ["aadhar", "pan", "voter", "driving_license", "passport"];
    if (!validIdentityTypes.includes(identity_type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid identity type. Must be one of: ${validIdentityTypes.join(", ")}`,
      });
    }

    // Validate identity number based on type
    let isValidIdentity = true;
    let errorMessage = "";

    switch (identity_type.toLowerCase()) {
      case "aadhar":
        // Aadhar is 12 digits
        if (!/^\d{12}$/.test(identity_number)) {
          isValidIdentity = false;
          errorMessage = "Aadhar number must be 12 digits";
        }
        break;
      case "pan":
        // PAN is 10 alphanumeric characters
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(identity_number.toUpperCase())) {
          isValidIdentity = false;
          errorMessage = "PAN must be 10 characters in the format ABCDE1234F";
        }
        break;
    }

    if (!isValidIdentity) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Identity document file is required",
      });
    }

    // Upload the identity document to Cloudinary
    const uploadResult = await uploadFile(req.file.path, 'vendor-identity');
    
    if (!uploadResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload identity document",
        error: uploadResult.error
      });
    }

    // Find or create vendor verification record
    let vendorVerification = await VendorVerification.findOne({ user: id });
    
    if (!vendorVerification) {
      // Create new vendor verification record
      vendorVerification = new VendorVerification({
        user: id,
        identity_proof: uploadResult.url,
        identity_proof_id: uploadResult.public_id,
        verification_status: user.is_email_verified ? "requested" : "pending"
      });

      if (user.is_email_verified) {
        vendorVerification.verification_requested_at = new Date();
      }
    } else {
      // If updating identity and previous proof exists, delete it
      if (vendorVerification.identity_proof_id) {
        await deleteFile(vendorVerification.identity_proof_id);
      }

      // Update existing verification record
      vendorVerification.identity_proof = uploadResult.url;
      vendorVerification.identity_proof_id = uploadResult.public_id;
      
      // Only change to "requested" if email is verified and status is pending
      if (user.is_email_verified && vendorVerification.verification_status === "pending") {
        vendorVerification.verification_status = "requested";
        vendorVerification.verification_requested_at = new Date();
      }
    }

    // Generate thumbnail URL using Cloudinary transformation
    const thumbnailUrl = uploadResult.url.replace('/upload/', '/upload/c_thumb,w_200,g_face/');
    vendorVerification.identity_proof_thumbnail = thumbnailUrl;
    
    // Add identity metadata
    vendorVerification.identity_type = identity_type.toLowerCase();
    vendorVerification.identity_number = identity_number;
    vendorVerification.identity_fullname = fullname;

    // Save the verification record
    await vendorVerification.save();

    // Ensure the vendor has a profile record
    let vendorProfile = await VendorProfile.findOne({ user: id });
    if (!vendorProfile) {
      vendorProfile = new VendorProfile({ user: id });
      await vendorProfile.save();
    }

    return res.status(200).json({
      success: true,
      message: "Identity verification submitted successfully",
      data: {
        verification_status: vendorVerification.verification_status,
        identity_type: identity_type,
        identity_number: identity_number,
        url: uploadResult.url,
        thumbnail_url: thumbnailUrl
      }
    });
  } catch (error) {
    console.error("Error in verifyIdentity:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.adminVerifyVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { action, reason } = req.body;
    const adminId = req.user.id;
    
    // Validate action
    if (!action || !['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be either 'approve' or 'reject'",
      });
    }
    
    // If rejecting, reason is required
    if (action === 'reject' && !reason) {
      return res.status(400).json({
        success: false,
        message: "Reason for rejection is required",
      });
    }
    
    // Find vendor verification record
    const vendorVerification = await VendorVerification.findOne({ user: vendorId });
    if (!vendorVerification) {
      return res.status(404).json({
        success: false,
        message: "Vendor verification record not found",
      });
    }
    
    // Update verification status
    if (action === 'approve') {
      vendorVerification.verification_status = "verified";
      vendorVerification.is_verified_vendor = true;
      vendorVerification.rejection_reason = null;
      vendorVerification.verified_at = new Date();
      vendorVerification.verified_by = adminId;
      vendorVerification.verification_completed_at = new Date();
    } else {
      vendorVerification.verification_status = "rejected";
      vendorVerification.is_verified_vendor = false;
      vendorVerification.rejection_reason = reason;
      vendorVerification.verification_completed_at = new Date();
    }
    
    await vendorVerification.save();
    
    return res.status(200).json({
      success: true,
      message: `Vendor ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      data: {
        vendor_id: vendorId,
        verification_status: vendorVerification.verification_status
      }
    });
  } catch (error) {
    console.error("Error in adminVerifyVendor:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
