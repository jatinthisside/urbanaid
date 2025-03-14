const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    email:{
        type: String,
    },
    phone: {
        type: String,
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

module.exports = mongoose.model("OTP", OTPSchema);

