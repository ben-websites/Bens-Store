const express = require("express");
const authController = require("../Controllers/authController.js");
const Middleware = require("../Middleware/authMIddleware.js");
const upload = require("../Middleware/uploadMiddleware.js");

const authrouter = express.Router();

authrouter.post(
  "/register",
  Middleware.registerMiddleware,
  authController.Register
);

authrouter.post(
  "/login",
  Middleware.loginMiddleware,
  authController.Login
);

authrouter.put(
  "/profile/:id",
  upload.single("profilePic"),
  authController.UpdateProfile
);

module.exports = authrouter;
