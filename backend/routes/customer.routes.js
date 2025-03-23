const express = require("express");
const router = express.Router();
const { auth, isCustomer } = require("../middlewares/auth");
const { updateProfile, getProfile } = require("../controllers/customer.conterollers");

router.get("/profile", auth, isCustomer, getProfile);
router.put("/profile", auth, isCustomer, updateProfile);

module.exports = router;
