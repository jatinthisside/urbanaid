const express = require("express");
const { signup, signin, sendOtp, verifyOtp } = require("../controllers/auth.controllers.js");
const router = express.Router();

// OTP routes
router.post("/send-otp", sendOtp);
router.get("/verify-otp", verifyOtp);

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;


