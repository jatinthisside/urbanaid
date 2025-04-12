const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    otp: {
        type: String,
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    validateBeforeSave: true
});

// Add TTL index to automatically delete documents after 10 minutes
OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }); // 600 seconds = 10 minutes

module.exports = mongoose.model("OTP", OTPSchema);

