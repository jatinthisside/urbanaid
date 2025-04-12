const express = require("express");
const router = express.Router();
const { auth, isVendor } = require("../middlewares/auth");
const { getProfile, setProfile, getMyProfile } = require("../controllers/vendor.controllers");
const upload = require("../middlewares/multer");

console.log('inside vendor routes')

// Get profiles
router.get("/profile", auth, isVendor, getMyProfile);
router.get("/profile/:id", auth, getProfile);

// Set up vendor profile (after verification)
router.post("/setup-profile", auth, isVendor, setProfile);
router.put("/update-profile", auth, isVendor, setProfile);

module.exports = router;

