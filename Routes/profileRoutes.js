
const express = require("express");

const {
  GetProfile,
  UpdateProfile,
} = require("../Controllers/profileController.js");

const upload = require("../Middleware/uploadMiddleware.js");

const router = express.Router();

// Get profile
router.get(
  "/profile/:id",
  GetProfile
);

// Update profile
router.put(
  "/profile/:id",
  upload.single("profilePic"),
  UpdateProfile
);

module.exports = router;
