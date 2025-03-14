const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    phone: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    gender: { type: String, trim: true },
    role: { type: String, enum: ["customer", "vendor"], required: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    pincode: { type: String, trim: true },
    profile_pic: { type: String, trim: true },
    is_verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
