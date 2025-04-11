const express = require("express");
const router = express.Router();
const { auth, isVendor } = require("../middlewares/auth");
const { getProfile, setProfile, getMyProfile } = require("../controllers/vendor.controllers");
const upload = require("../middlewares/multer");

console.log('inside vendor routes')

router.get("/vendor/profile", auth, isVendor, getMyProfile);
router.get("/vendor/profile/:id", auth, getProfile);
router.post("/vendor/profile", auth, isVendor, upload.single('identity_proof'), setProfile);

module.exports = router;

