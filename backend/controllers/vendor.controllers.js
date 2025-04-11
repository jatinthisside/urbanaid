const VendorProfile = require("../models/VendorProfile");
const User = require("../models/User");
const { isValidObjectId } = require("mongoose");
const { uploadFile, deleteFile } = require("../utils/fileUpload");

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vendor ID format",
      });
    }
    
    const vendorProfile = await VendorProfile.findOne({ user: id })
      .populate("user", "-password");
    
    if (!vendorProfile) {
      return res.status(404).json({
        success: false,
        message: "Vendor profile not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      data: vendorProfile,
      message: "Vendor profile retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving vendor profile:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

exports.getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get vendor profile with populated user information
        const vendorProfile = await VendorProfile.findOne({ user: userId })
            .populate("user", "-password");
        
        if (!vendorProfile) {
            return res.status(404).json({
                success: false,
                message: "Vendor profile not found. Please set up your profile.",
            });
        }
        
        return res.status(200).json({
            success: true,
            data: vendorProfile,
            message: "Vendor profile retrieved successfully",
        });
    } catch (error) {
        console.error("Error retrieving vendor profile:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

exports.setProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "vendor" && user.role !== "Vendor") {
      return res.status(403).json({
        success: false,
        message: "Only vendors can create a vendor profile",
      });
    }

    // Extract profile data from request body
    const { dob, about, work_start_time, work_end_time } = req.body;
    const work_days = JSON.parse(req.body.work_days);

    // Validation checks
    if (!about || about.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "About section is required",
      });
    }

    // Check for uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Identity proof document is required",
      });
    }

    if (!work_start_time || !work_end_time) {
      return res.status(400).json({
        success: false,
        message: "Work start and end times are required",
      });
    }

    if (!work_days || !Array.isArray(work_days) || work_days.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one work day must be specified",
      });
    }

    // Validate work days format (should be valid days of the week)
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const invalidDays = work_days.filter((day) => !validDays.includes(day));

    if (invalidDays.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid work days: ${invalidDays.join(
          ", "
        )}. Valid days are: ${validDays.join(", ")}`,
      });
    }

    // Upload identity proof document to Cloudinary
    const uploadResult = await uploadFile(
      req.file.path,
      "urbanaid_vendor_documents"
    );

    if (!uploadResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload identity document",
        error: uploadResult.error,
      });
    }

    // Check if vendor profile already exists
    let vendorProfile = await VendorProfile.findOne({ user: userId });

    if (vendorProfile) {
      return res.status(400).json({
        success: false,
        message: "Vendor profile already exists",
      });
    }

    const thumbnailUrl = uploadResult.url.replace(
      "/upload/",
      "/upload/c_thumb,w_200,g_face/"
    );

    const result = await VendorProfile.create({
      user: userId,
      dob,
      about,
      identity_proof: uploadResult.url,
      identity_proof_id: uploadResult.public_id,
      identity_proof_thumbnail: thumbnailUrl,
      work_start_time,
      work_end_time,
      work_days,
      is_verified_vendor: false,
    });

    return res.status(201).json({
      success: true,
      data: result,
      message:
        "Vendor profile created successfully. Awaiting verification by admin.",
    });
  } catch (error) {
    console.error("Error setting vendor profile:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
