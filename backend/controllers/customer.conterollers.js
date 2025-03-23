const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if(user.role !== 'customer') {
            return res.status(403).json({
                success: false,
                message: "Only customer profile can be fetched via this route.",
            });
        }
        user.password = undefined;
        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            result: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

exports.updateProfile = async (req, res) => {
    try{
        const {id} = req.user;
        if(!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        
        const {fullname,email,gender,city,state,country,pincode,phone} = req.body;
        const fieldsToUpdate = {};
        if(fullname) fieldsToUpdate.fullname = fullname;
        if(email) fieldsToUpdate.email = email;
        if(gender) fieldsToUpdate.gender = gender;
        if(city) fieldsToUpdate.city = city;
        if(state) fieldsToUpdate.state = state;
        if(country) fieldsToUpdate.country = country;
        if(pincode) fieldsToUpdate.pincode = pincode;
        if(phone) fieldsToUpdate.phone = phone;

        const updatedUser = await User.findByIdAndUpdate(id,{$set: fieldsToUpdate},{new: true,runValidators: true}).select("-password");
        if(!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            result: updatedUser,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
