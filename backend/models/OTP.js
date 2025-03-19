const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    validateBeforeSave: true
});

// Custom validator to ensure either email or phone is provided
OTPSchema.pre('save', function(next) {
    if (!this.email && !this.phone) {
        next(new Error('Either email or phone is required'));
    }
    next();
});

// Add TTL index to automatically delete documents after 10 minutes
OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }); // 600 seconds = 10 minutes

module.exports = mongoose.model("OTP", OTPSchema);

