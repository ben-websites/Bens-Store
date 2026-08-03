const express = require('express')
const connectDB = require('../config/connect_db.js')
const user = require('../Models/userModel.js')
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudnary.js");
const cors = require('cors')
const userController = require('../Controllers/userController.js')
const Middleware = require('../Middleware/userMiddleware.js')
const userrouter = express.Router()



userrouter.get('/users', userController.getUser)
userrouter.post('/adduser', upload.single("image"),Middleware.usermiddleware, userController.addUser)
userrouter.delete('/deleteuser/:id', userController.deleteUser)
userrouter.put('/updateuser/:id',Middleware.usermiddleware, userController.updateUser)

module.exports = userrouter