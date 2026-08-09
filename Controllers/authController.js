const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config()
const Auth = require('../Models/authModel.js')
const { findOne } = require('../Models/authModel.js')
const cloudinary = require("../config/cloudinary");


const UpdateProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const {
            name,
            email,
            phone,
            address,
            city,
            postalCode
        } = req.body;

        const user = await Auth.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let profilePic = user.profilePic;

        // If user selected a new profile picture
        if (req.file) {

            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "ben-store/profiles"
                }
            );

            profilePic = result.secure_url;
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.city = city;
        user.postalCode = postalCode;
        user.profilePic = profilePic;

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
                postalCode: user.postalCode
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await Auth.findOne({ email })
        if (user) {
            return res.json({ message: "This email is already in use", success: false })
        }
        if (password.length < 8) {
            return res.json({ message: "password must be greater than 8 digits", success: false })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const acccoun = await Auth.create({
            name: name,
            email: email,
            password: hashpassword
        })
        res.json({ message: "Account created", success: true, data: acccoun })


    } catch (error) {
res.status(500).json({
        success:false,
        message:error.message
    })
    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Auth.findOne({ email })
        if (!user) {
            return res.json({ message: "User not Found", success: false })
        }

        const matchpass = await bcrypt.compare(password, user.password)
        if (!matchpass) {
            return res.json({ message: `Password not match`, success: false })
        }

        const token = await jwt.sign({ id: user._id, role: user.role }, process.env.MY_KEY, { expiresIn: "7d" })


        res.json({ message: `Welcome ${user.name} `, token: token, role:user.role,name: user.name,
  userId: user._id, email:user.email , success: true })

    } catch (error) {
        res.status(500).json({
        success:false,
        message:error.message
    })
    }
}

module.exports = {
  Register,
  Login,
  UpdateProfile
}
