const mongoose = require("mongoose");

const VendorProfileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true
  },
  
  // Personal Information
  dob: { type: Date, trim: true },
  about: { type: String, trim: true },
  profile_headline: { type: String, trim: true }, // Short professional headline
  experience_years: { type: Number, default: 0 }, // Years of experience
  
  // Address Information
  street_address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true, default: "India" },
  pincode: { type: String, trim: true },
  location_coordinates: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
  },
  service_radius: { type: Number, default: 10, required: false }, // Service radius in km
  
  // Service Information
  work_start_time: { type: String, trim: true },
  work_end_time: { type: String, trim: true },
  work_days: { type: [String], trim: true },
  service_categories: { type: [String], trim: true }, // Categories vendor operates in
  skills: { type: [String], trim: true }, // Specific skills vendor has
  languages_spoken: { type: [String], trim: true, default: ["English", "Hindi"] },
  
  // Pricing Information
  price_negotiable: { type: Boolean, default: true },
  accepts_online_payment: { type: Boolean, default: false },
  
  // Ratings & Reviews
  average_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  total_completed_jobs: { type: Number, default: 0 },
  
  // Status Information
  is_active: { type: Boolean, default: true }, // Whether vendor is currently active
  profile_completion: { type: Number, default: 0 }, // Profile completion percentage
  
  // Services offered (references to service model)
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
}, {timestamps: true});

module.exports = mongoose.model("VendorProfile", VendorProfileSchema);
