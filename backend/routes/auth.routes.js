const express = require("express");
const { signup, signin, sendOtp, verifyOtp, decodeJwt, signout } = require("../controllers/auth.controllers.js");
const { auth } = require("../middlewares/auth.js");
const router = express.Router();

// OTP routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/auth/me", auth, decodeJwt);
router.get("/signout", auth, signout);

module.exports = router;


