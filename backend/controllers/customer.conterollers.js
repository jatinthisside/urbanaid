const User = require("../models/User");

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
