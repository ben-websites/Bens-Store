const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = require("../Models/authModel.js");
const cloudinary = require("../config/cloudnary.js");

// =====================================
// UPDATE PROFILE
// =====================================

const UpdateProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const {
      name,
      phone,
      address,
      city,
      postalCode,
    } = req.body;

    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Keep the existing profile picture
    let profilePic = user.profilePic;

    // Upload new profile picture if selected
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "ben-store/profiles",
        }
      );

      profilePic = result.secure_url;
    }

    // Update editable profile fields
    user.name = name;
    user.phone = phone;
    user.address = address;
    user.city = city;
    user.postalCode = postalCode;
    user.profilePic = profilePic;

    // IMPORTANT:
    // Email is NOT changed here.
    // The existing email remains untouched.

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        phone: user.phone,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
      },
    });
  } catch (error) {
    console.log("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET PROFILE
// =====================================

const GetProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Auth.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// REGISTER
// =====================================

const Register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const user = await Auth.findOne({ email });

    if (user) {
      return res.json({
        message: "This email is already in use",
        success: false,
      });
    }

    if (password.length < 8) {
      return res.json({
        message: "Password must be at least 8 characters",
        success: false,
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const account = await Auth.create({
      name: name,
      email: email,
      password: hashpassword,
    });

    res.json({
      message: "Account created",
      success: true,
      data: account,
    });
  } catch (error) {
    console.log("Register Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// LOGIN
// =====================================

const Login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }

    const matchpass = await bcrypt.compare(
      password,
      user.password
    );

    if (!matchpass) {
      return res.json({
        message: "Password does not match",
        success: false,
      });
    }

    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.MY_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: `Welcome ${user.name}`,
      token: token,
      role: user.role,
      name: user.name,
      userId: user._id,
      email: user.email,
      success: true,
    });
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// EXPORTS
// =====================================

module.exports = {
  Register,
  Login,
  UpdateProfile,
  GetProfile,
};
