const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    phone: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    gender: { type: String, trim: true, required: false },
    role: { type: String, enum: ["customer", "vendor"], required: true },
    city: { type: String, trim: true, required: false },
    profile_pic: { type: String, trim: true, required: false },
    profile_pic_id: { type: String, trim: true, required: false },
    state: { type: String, trim: true, required: false },
    country: { type: String, trim: true, required: false },
    pincode: { type: String, trim: true, required: false },
    is_email_verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
