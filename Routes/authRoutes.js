const express = require("express");
const authController = require("../Controllers/authController");
const Middleware = require("../Middleware/authMiddleware");

const authrouter = express.Router();




authrouter.post('/register', Middleware.registerMiddleware, authController.Register)
authrouter.post('/login', Middleware.loginMiddleware, authController.Login)

module.exports = authrouter


