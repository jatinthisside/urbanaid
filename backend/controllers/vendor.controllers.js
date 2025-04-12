const VendorProfile = require("../models/VendorProfile");
const VendorVerification = require("../models/VendorVerification");
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
    
    // Get both profile and verification data
    const vendorProfile = await VendorProfile.findOne({ user: id })
      .populate("user", "-password");
    
    const vendorVerification = await VendorVerification.findOne({ user: id });
    
    if (!vendorProfile) {
      return res.status(404).json({
        success: false,
        message: "Vendor profile not found",
      });
    }
    
    // Combine data for response
    const responseData = {
      ...vendorProfile.toObject(),
      verification: vendorVerification ? {
        status: vendorVerification.verification_status,
        is_verified: vendorVerification.is_verified_vendor,
        identity_type: vendorVerification.identity_type,
        identity_proof_thumbnail: vendorVerification.identity_proof_thumbnail,
        business_name: vendorVerification.business_name,
        business_type: vendorVerification.business_type
      } : null
    };
    
    return res.status(200).json({
      success: true,
      data: responseData,
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
    
    // Get both profile and verification data
    const vendorProfile = await VendorProfile.findOne({ user: userId })
      .populate("user", "-password");
    
    const vendorVerification = await VendorVerification.findOne({ user: userId });
    
    if (!vendorProfile) {
      return res.status(404).json({
        success: false,
        message: "Vendor profile not found. Please complete verification first.",
      });
    }
    
    // Combine data for response
    const responseData = {
      ...vendorProfile.toObject(),
      verification: vendorVerification ? {
        status: vendorVerification.verification_status,
        is_verified: vendorVerification.is_verified_vendor,
        identity_type: vendorVerification.identity_type,
        identity_proof_thumbnail: vendorVerification.identity_proof_thumbnail,
        business_name: vendorVerification.business_name,
        business_type: vendorVerification.business_type
      } : null
    };
    
    return res.status(200).json({
      success: true,
      data: responseData,
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

    // Find and validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify user is a vendor (case insensitive)
    if (user.role.toLowerCase() !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Only vendors can create or update a vendor profile",
      });
    }

    // Check email verification status
    if (!user.is_email_verified) {
      return res.status(403).json({
        success: false,
        message: "Email verification is required before setting up profile",
      });
    }

    // Find existing vendor profile and verification documents
    let vendorProfile = await VendorProfile.findOne({ user: userId });
    const vendorVerification = await VendorVerification.findOne({ user: userId });
    
    // Verify identity verification process has been started
    if (!vendorVerification || !vendorVerification.identity_proof) {
      return res.status(400).json({
        success: false,
        message: "Please complete identity verification first",
      });
    }

    // Check verification status - must be in requested or verified state
    if (vendorVerification.verification_status !== "requested" && 
        vendorVerification.verification_status !== "verified") {
      return res.status(400).json({
        success: false,
        message: "Identity verification must be completed and requested/approved before setting up profile",
        current_status: vendorVerification.verification_status
      });
    }
    
    // Create profile if it doesn't exist yet
    if (!vendorProfile) {
      vendorProfile = new VendorProfile({ user: userId });
    }

    // Extract profile data from request body with destructuring
    const {
      // Personal info
      dob,
      about,
      profile_headline,
      experience_years,
      
      // Address info
      street_address,
      city,
      state,
      country,
      pincode,
      latitude,
      longitude,
      service_radius,
      
      // Service info
      work_start_time,
      work_end_time,
      work_days,
      service_categories,
      skills,
      languages_spoken,
      
      // Pricing info
      price_negotiable,
      accepts_online_payment
    } = req.body;

    // Define and validate required fields
    const requiredFields = ['about', 'work_start_time', 'work_end_time', 'work_days'];
    const missingFields = requiredFields.filter(field => {
      // Check for null, undefined, empty string, or empty array
      const value = req.body[field];
      return value === undefined || value === null || 
             (typeof value === 'string' && value.trim() === '') ||
             (Array.isArray(value) && value.length === 0);
    });
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following required fields are missing: ${missingFields.join(', ')}`,
      });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (work_start_time && !timeRegex.test(work_start_time)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work start time format. Use HH:MM (24-hour format)",
      });
    }
    
    if (work_end_time && !timeRegex.test(work_end_time)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work end time format. Use HH:MM (24-hour format)",
      });
    }

    // Parse and validate arrays if they're provided as strings
    let parsedWorkDays = work_days;
    let parsedServiceCategories = service_categories;
    let parsedSkills = skills;
    let parsedLanguages = languages_spoken;
    
    try {
      if (work_days && typeof work_days === 'string') {
        parsedWorkDays = JSON.parse(work_days);
      }
      
      if (service_categories && typeof service_categories === 'string') {
        parsedServiceCategories = JSON.parse(service_categories);
      }
      
      if (skills && typeof skills === 'string') {
        parsedSkills = JSON.parse(skills);
      }
      
      if (languages_spoken && typeof languages_spoken === 'string') {
        parsedLanguages = JSON.parse(languages_spoken);
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format in array fields",
        error: error.message
      });
    }

    // Check that arrays are actually arrays after parsing
    if (parsedWorkDays && !Array.isArray(parsedWorkDays)) {
      return res.status(400).json({
        success: false,
        message: "work_days must be an array",
      });
    }

    if (parsedServiceCategories && !Array.isArray(parsedServiceCategories)) {
      return res.status(400).json({
        success: false,
        message: "service_categories must be an array",
      });
    }

    if (parsedSkills && !Array.isArray(parsedSkills)) {
      return res.status(400).json({
        success: false,
        message: "skills must be an array",
      });
    }

    // Validate work days format (should be valid days of the week)
    if (parsedWorkDays && Array.isArray(parsedWorkDays)) {
      // Ensure we have at least one work day
      if (parsedWorkDays.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one work day must be specified",
        });
      }

      const validDays = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ];
      
      // Check for invalid days
      const invalidDays = parsedWorkDays.filter(day => !validDays.includes(day));
      if (invalidDays.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid work days: ${invalidDays.join(", ")}. Valid days are: ${validDays.join(", ")}`,
        });
      }
    }

    // Validate numeric fields
    if (experience_years !== undefined && (isNaN(experience_years) || experience_years < 0)) {
      return res.status(400).json({
        success: false,
        message: "Experience years must be a non-negative number",
      });
    }

    if (service_radius !== undefined && (isNaN(service_radius) || service_radius <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Service radius must be a positive number",
      });
    }

    // Validate coordinates
    if ((latitude && !longitude) || (!latitude && longitude)) {
      return res.status(400).json({
        success: false,
        message: "Both latitude and longitude must be provided together",
      });
    }

    if (latitude && longitude) {
      // Check latitude range (-90 to 90)
      const latNum = parseFloat(latitude);
      if (isNaN(latNum) || latNum < -90 || latNum > 90) {
        return res.status(400).json({
          success: false,
          message: "Latitude must be a number between -90 and 90",
        });
      }
      
      // Check longitude range (-180 to 180)
      const longNum = parseFloat(longitude);
      if (isNaN(longNum) || longNum < -180 || longNum > 180) {
        return res.status(400).json({
          success: false,
          message: "Longitude must be a number between -180 and 180",
        });
      }
    }

    // Update vendor profile fields
    // Personal info
    if (dob) {
      const dobDate = new Date(dob);
      // Validate date is not in the future and user is at least 18 years old
      const now = new Date();
      const eighteenYearsAgo = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
      
      if (isNaN(dobDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format for date of birth",
        });
      }
      
      if (dobDate > now) {
        return res.status(400).json({
          success: false,
          message: "Date of birth cannot be in the future",
        });
      }
      
      if (dobDate > eighteenYearsAgo) {
        return res.status(400).json({
          success: false,
          message: "Vendor must be at least 18 years old",
        });
      }
      
      vendorProfile.dob = dobDate;
    }

    // Update text fields
    if (about) vendorProfile.about = about.trim();
    if (profile_headline) vendorProfile.profile_headline = profile_headline.trim();
    if (experience_years !== undefined) vendorProfile.experience_years = parseInt(experience_years);
    
    // Address info
    if (street_address) vendorProfile.street_address = street_address.trim();
    if (city) vendorProfile.city = city.trim();
    if (state) vendorProfile.state = state.trim();
    if (country) vendorProfile.country = country.trim();
    if (pincode) vendorProfile.pincode = pincode.trim();
    
    // Location coordinates (if both provided)
    if (latitude && longitude) {
      vendorProfile.location_coordinates = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      };
    }
    
    if (service_radius !== undefined) vendorProfile.service_radius = parseFloat(service_radius);
    
    // Service info
    if (work_start_time) vendorProfile.work_start_time = work_start_time;
    if (work_end_time) vendorProfile.work_end_time = work_end_time;
    if (parsedWorkDays) vendorProfile.work_days = parsedWorkDays;
    if (parsedServiceCategories) vendorProfile.service_categories = parsedServiceCategories;
    if (parsedSkills) vendorProfile.skills = parsedSkills;
    if (parsedLanguages) vendorProfile.languages_spoken = parsedLanguages;
    
    // Pricing info
    if (price_negotiable !== undefined) {
      // Convert string 'true'/'false' to boolean if needed
      if (typeof price_negotiable === 'string') {
        vendorProfile.price_negotiable = price_negotiable.toLowerCase() === 'true';
      } else {
        vendorProfile.price_negotiable = Boolean(price_negotiable);
      }
    }
    if (accepts_online_payment !== undefined) {
      // Convert string 'true'/'false' to boolean if needed
      if (typeof accepts_online_payment === 'string') {
        vendorProfile.accepts_online_payment = accepts_online_payment.toLowerCase() === 'true';
      } else {
        vendorProfile.accepts_online_payment = Boolean(accepts_online_payment);
      }
    }
    
    // Calculate profile completion percentage
    const allFields = [
      'dob', 'about', 'profile_headline', 'experience_years', 
      'street_address', 'city', 'state', 'pincode', 'location_coordinates',
      'work_start_time', 'work_end_time', 'work_days', 'service_categories', 'skills'
    ];
    
    const fieldValues = allFields.map(field => {
      if (field === 'location_coordinates') {
        return vendorProfile.location_coordinates && 
               vendorProfile.location_coordinates.latitude && 
               vendorProfile.location_coordinates.longitude ? 1 : 0;
      }
      
      if (Array.isArray(vendorProfile[field])) {
        return vendorProfile[field] && vendorProfile[field].length > 0 ? 1 : 0;
      }
      
      return vendorProfile[field] ? 1 : 0;
    });
    
    const filledFields = fieldValues.reduce((sum, val) => sum + val, 0);
    const completionPercentage = Math.round((filledFields / allFields.length) * 100);
    vendorProfile.profile_completion = completionPercentage;

    // Update the User model with shared fields from profile
    if (city) user.city = city;
    if (state) user.state = state;
    if (country) user.country = country;
    if (pincode) user.pincode = pincode;
    await user.save();

    // Save the updated profile
    await vendorProfile.save();

    // Return combined data with vendor profile and verification status
    const responseData = {
      ...vendorProfile.toObject(),
      verification: {
        status: vendorVerification.verification_status,
        is_verified: vendorVerification.is_verified_vendor
      },
      user: {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        profile_pic: user.profile_pic
      }
    };

    return res.status(200).json({
      success: true,
      data: responseData,
      message: "Vendor profile updated successfully",
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
