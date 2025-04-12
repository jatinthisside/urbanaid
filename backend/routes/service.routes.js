const express = require("express");
const router = express.Router();
const {
  createService,
  getServiceById,
  updateService,
  deleteService,
  getVendorServices,
  getAllServices
} = require("../controllers/service.controllers");
const { auth, isVendor, isVerified } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

// Configure multer for multiple file uploads
const serviceUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
]);

// Public routes
router.get("/", getAllServices);

// Vendor routes - require authentication
router.get("/vendor/services", auth, isVendor, getVendorServices);
router.post("/", auth, isVerified, isVendor, createService);
router.put("/:id", auth, isVerified, isVendor, updateService);
router.delete("/:id", auth, isVerified, isVendor, deleteService);

// This route needs to be last because it has a parameter that could match other routes
router.get("/:id", getServiceById);

module.exports = router; 