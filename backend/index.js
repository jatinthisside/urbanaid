const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/database.js");
const cors = require("cors");
const fs = require("fs");
const authRoutes = require("./routes/auth.routes.js");
const customerRoutes = require("./routes/customer.routes.js");
const vendorRoutes = require("./routes/vendor.routes.js");
const verificationRoutes = require("./routes/verification.routes.js");
const serviceRoutes = require("./routes/service.routes.js");
const { cleanupUploadsFolder } = require("./utils/fileUpload.js");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

connectToDB();

// register routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", customerRoutes);
app.use("/api/v1", vendorRoutes);
app.use("/api/v1", verificationRoutes);
app.use("/api/v1", serviceRoutes);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.send("Urban Aid API is running");
});

// Schedule regular cleanup of uploads folder
// Cleanup files older than 30 minutes every 15 minutes
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
const CLEANUP_MAX_AGE_MINUTES = 30; // 30 minutes

// Run initial cleanup when server starts
cleanupUploadsFolder(CLEANUP_MAX_AGE_MINUTES);
console.log(`Initial uploads folder cleanup complete. Will clean files older than ${CLEANUP_MAX_AGE_MINUTES} minutes every ${CLEANUP_INTERVAL_MS/60000} minutes.`);

// Schedule periodic cleanup
setInterval(() => {
  const result = cleanupUploadsFolder(CLEANUP_MAX_AGE_MINUTES);
  if (result.success && result.deletedFiles > 0) {
    console.log(`Scheduled cleanup: ${result.message}`);
  }
}, CLEANUP_INTERVAL_MS);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});