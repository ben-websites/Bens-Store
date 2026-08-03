const express = require('express')
const connectDB = require('../config/connect_db.js')
const user = require('../Models/userModel.js')
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudnary.js");
const cors = require('cors')
const app = express();
app.use(cors())


const getUser = async (req, res) => {

  try {
    const users = await user.find()
    res.json(users)
  } catch (error) {
    res.status(500).send('user Not Found')
  }
}

const addUser = async (req, res) => {

  try {
    const { name, age, email } = req.body
    console.log(req.file);

    let imageUrl = "";
    if (req.file) {

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users"
      });

      // console.log(result);

      imageUrl = result.secure_url;
    }


    const newuser = await user.create({
      name: name,
      age: age,
      email: email,
      image: imageUrl
    })
    res.json({ message: "User Added", status: true, data: newuser })

  } catch (error) {
    res.status(500).send(`User Not Added! error = ${error.message} `)
  }
}

 const deleteUser = async (req, res) => {
  try {

    const deleteduser = await user.findByIdAndDelete(req.params.id)
    if (!deleteduser) {
      return res.send("User not found")
    }
    res.json({ message: "User Deleted", status: true, data: deleteduser })

  } catch (error) {
    res.status(500).send(`User Not deleted! error = ${error.message} `)
  }
}

 const updateUser = async (req, res) => {
  try {
    const { name, age, email } = req.body
    const updateduser = await user.findById(req.params.id)
    if (!updateduser) {
      return res.send("User not found")
    }
    if (name) updateduser.name = name
    if (age) updateduser.age = age
    if (email) updateduser.email = email

   await updateduser.save();
    res.json({ message: "User Updated", status: true, data: updateduser })
  } catch (error) {
    res.status(500).send(`User Not deleted! error = ${error.message} `)
  }
}


module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
}