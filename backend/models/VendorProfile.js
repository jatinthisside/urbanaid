const mongoose = require("mongoose");

const VendorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dob: { type: Date, trim: true },
  about: { type: String, trim: true },
  identity_proof: { type: String, trim: true },
  identity_proof_id: { type: String, trim: true },
  identity_proof_thumbnail: { type: String, trim: true },
  is_verified_vendor: { type: Boolean, default: false },
  work_start_time: { type: String, trim: true },
  work_end_time: { type: String, trim: true },
  work_days: { type: [String], trim: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
}, {timestamps: true});

module.exports = mongoose.model("VendorProfile", VendorProfileSchema);
