
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = require("../Models/authModel.js");

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

    const token = jwt.sign(
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
};

