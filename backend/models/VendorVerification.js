const mongoose = require("mongoose");

const VendorVerificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true 
  },
  
  // Identity Verification
  identity_proof: { type: String, trim: true },
  identity_proof_id: { type: String, trim: true },
  identity_proof_thumbnail: { type: String, trim: true },
  identity_type: { type: String, trim: true }, // aadhar, pan, voter, etc.
  identity_number: { type: String, trim: true }, // ID card number
  identity_fullname: { type: String, trim: true }, // Name on the ID card
  
  // Business Verification
  business_identity: { type: String, trim: true },
  business_identity_id: { type: String, trim: true },
  business_identity_thumbnail: { type: String, trim: true },
  business_name: { type: String, trim: true },
  business_type: { type: String, trim: true },
  business_registration_number: { type: String, trim: true },
  
  // Verification Status
  is_verified_vendor: { type: Boolean, default: false },
  verification_status: { 
    type: String, 
    enum: ["pending", "requested", "verified", "rejected"], 
    default: "pending" 
  },
  rejection_reason: { type: String, trim: true },
  verified_at: { type: Date },
  verified_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  
  // Tracking
  verification_requested_at: { type: Date },
  verification_completed_at: { type: Date }
}, 
{
  timestamps: true
});

module.exports = mongoose.model("VendorVerification", VendorVerificationSchema); 