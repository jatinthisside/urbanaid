const User = require("../models/User");
const bcrypt = require("bcrypt");
const { uploadFile, deleteFile } = require("../utils/fileUpload");

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
    try {
        const {id} = req.user;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        
        // Find current user to check for existing data
        const currentUser = await User.findById(id);
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Extract all possible fields from request body
        const {
            fullname,
            email,
            phone,
            gender,
            city,
            state,
            country,
            pincode,
        } = req.body;

        // Validation
        if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        if (phone && !/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit phone number",
            });
        }

        if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Gender must be one of: male, female, other",
            });
        }

        if (pincode && !/^\d{6}$/.test(pincode)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 6-digit pincode",
            });
        }

        // Check if email or phone is being changed and if they're already in use
        if (email && email !== currentUser.email) {
            const emailExists = await User.findOne({ email, _id: { $ne: id } });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email is already in use by another account",
                });
            }
            // If changing email, reset email verification status
            fieldsToUpdate.is_email_verified = false;
        }

        if (phone && phone !== currentUser.phone) {
            const phoneExists = await User.findOne({ phone, _id: { $ne: id } });
            if (phoneExists) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number is already in use by another account",
                });
            }
        }

        // Build update object with only provided fields
        const fieldsToUpdate = {};
        if (fullname) fieldsToUpdate.fullname = fullname;
        if (email) fieldsToUpdate.email = email;
        if (phone) fieldsToUpdate.phone = phone;
        if (gender) fieldsToUpdate.gender = gender.toLowerCase();
        if (city) fieldsToUpdate.city = city;
        if (state) fieldsToUpdate.state = state;
        if (country) fieldsToUpdate.country = country;
        if (pincode) fieldsToUpdate.pincode = pincode;
        if (profile_pic) fieldsToUpdate.profile_pic = profile_pic;

        // If no fields to update, return early
        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update",
            });
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: fieldsToUpdate },
            { new: true, runValidators: true }
        ).select("-password");

        // Generate new profile picture URL if name changed but no custom profile pic provided
        if (fullname && !profile_pic && fullname !== currentUser.fullname) {
            const name_arr = fullname.split(" ");
            const fname = name_arr[0];
            const lname = name_arr[1] || "";
            const new_profile_pic = `https://ui-avatars.com/api/?name=${fname}+${lname}`;
            
            updatedUser.profile_pic = new_profile_pic;
            await updatedUser.save();
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

exports.changePassword = async (req, res) => {
    try{
        const {id} = req.user;
        const {oldPassword,newPassword} = req.body;
        if(!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }   
        if(!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old and new password are required",
            });
        }
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid old password",
            });
        }
        user.password = await bcrypt.hash(newPassword,10);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.user;
        
        // Check if password is provided for security
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required to delete account",
            });
        }

        // Find the user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // Delete user
        await User.findByIdAndDelete(id);
        
        // Clear authentication cookie if using cookies
        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting account:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

exports.uploadProfilePic = async (req, res) => {
    try {
        const { id } = req.user;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided",
            });
        }

        // Find the user to check if they exist and if they already have a profile picture
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Upload the new profile picture to Cloudinary
        const uploadResult = await uploadFile(req.file.path, 'customer-profiles');
        
        if (!uploadResult.success) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload profile picture",
                error: uploadResult.error
            });
        }

        // If user had a previous Cloudinary profile picture, delete it
        // Check if the old URL contains Cloudinary path (not UI Avatars)
        if (user.profile_pic && user.profile_pic.includes('res.cloudinary.com') && user.profile_pic_id) {
            await deleteFile(user.profile_pic_id);
        }

        // Update user profile with new profile picture URL
        user.profile_pic = uploadResult.url;
        user.profile_pic_id = uploadResult.public_id; // Store Cloudinary public_id for future deletion
        
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: {
                profile_pic: user.profile_pic
            }
        });
    } catch (error) {
        console.error("Error uploading profile picture:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
