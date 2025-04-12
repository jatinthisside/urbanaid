const express = require("express");
const router = express.Router();
const { 
  verifyEmail, 
  verifyIdentity,  
  sendEmailVerificationOTP,
  adminVerifyVendor
} = require("../controllers/verification.controllers");
const { auth, isVendor, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

// Vendor email verification
router.post("/send-email-otp", auth, isVendor, sendEmailVerificationOTP);
router.post("/verify-email", auth, isVendor, verifyEmail);

// Vendor identity verification
router.post("/verify-identity-request", auth, isVendor, upload.single('identity_document'), verifyIdentity);

// Admin verification endpoints
router.post("/admin/verify-vendor/:vendorId", auth, isAdmin, adminVerifyVendor);

module.exports = router;
