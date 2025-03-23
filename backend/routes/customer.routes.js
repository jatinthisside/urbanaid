const express = require("express");
const router = express.Router();
const { auth, isCustomer } = require("../middlewares/auth");
const { updateProfile, getProfile, changePassword } = require("../controllers/customer.conterollers");

router.get("/profile", auth, isCustomer, getProfile);
router.put("/profile", auth, isCustomer, updateProfile);
router.patch("/change-password/:id", auth, isCustomer, changePassword);

module.exports = router;
