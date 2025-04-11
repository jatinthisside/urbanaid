const express = require("express");
const router = express.Router();
const { auth, isCustomer } = require("../middlewares/auth");
const { updateProfile, getProfile, changePassword, deleteAccount, uploadProfilePic } = require("../controllers/customer.conterollers");
const upload = require("../middlewares/multer");

router.get("/profile", auth, isCustomer, getProfile);
router.put("/profile", auth, isCustomer, updateProfile);
router.patch("/change-password", auth, isCustomer, changePassword);
router.delete("/profile", auth, isCustomer, deleteAccount);
router.post("/profile-pic", auth, isCustomer, upload.single('profile_pic'), uploadProfilePic);

module.exports = router;
