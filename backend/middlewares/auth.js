const jwt = require("jsonwebtoken");
const User = require("../models/User");
const VendorProfile = require("../models/VendorProfile");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = 
      req.cookies.token || 
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Please login to continue.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ROLE-BASED AUTHORIZATION MIDDLEWARE

// Check if user has customer role
const isCustomer = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    if (req.user.role !== "customer" && req.user.role !== "Customer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only customers can access this resource.",
      });
    }

    next();
  } catch (error) {
    console.error("Customer middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Check if user has vendor role
const isVendor = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    if (req.user.role !== "vendor" && req.user.role !== "Vendor") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only vendors can access this resource.",
      });
    }

    next();
  } catch (error) {
    console.error("isVendor middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Check if vendor profile exists and is verified
const isVerifiedVendor = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    if (req.user.role !== "vendor" || req.user.role !== "Vendor") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only vendors can access this resource.",
      });
    }

    const vendorProfile = await VendorProfile.findOne({ user: req.user.id });
    
    if (!vendorProfile) {
      return res.status(403).json({
        success: false,
        message: "Vendor profile not found. Please complete your profile.",
      });
    }

    if (!vendorProfile.is_verified_vendor) {
      return res.status(403).json({
        success: false,
        message: "Vendor verification pending. Please wait for admin approval.",
      });
    }

    next();
  } catch (error) {
    console.error("vendor verification middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Check if user has admin role
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    if (req.user.role !== "admin" && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only administrators can access this resource.",
      });
    }

    next();
  } catch (error) {
    console.error("admin middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  auth,
  isCustomer,
  isVendor,
  isVerifiedVendor,
  isAdmin
};
