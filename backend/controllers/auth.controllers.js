const User = require("../models/User.js");

exports.signup = async (req, res) => {
    try {
        const {fullName:fullname,phone,email,gender,role,city,state,country,pincode} = req.body

        if (!fullname || !phone || !email || !gender || !city || !state || !country || !pincode) 
        {
          return res.status(403).json({
            success: false,
            message: "All Fields are required",
          })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{email}, {phone}] })
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          })
        }

        const user = await User.create({
          fullname,
          phone,
          email,
          role,
          gender,
          city,
          state,
          country,
          pincode,
        })
    
        return res.status(200).json({
          success: true,
          user,
          message: "User registered successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
      }
}

exports.signin = async (req, res) => {

}

