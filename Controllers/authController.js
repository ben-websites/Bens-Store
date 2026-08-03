const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config()
const Auth = require('../Models/authModel.js')
const { findOne } = require('../Models/authModel.js')




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
  Login
}