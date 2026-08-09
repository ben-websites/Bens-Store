```js
const Auth = require("../Models/authModel");
const cloudinary = require("../config/cloudnary.js");

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

    // =====================================
    // PROFILE PICTURE
    // =====================================

    let profilePic = user.profilePic;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "ben-store/profiles",
        }
      );

      profilePic = result.secure_url;
    }

    // =====================================
    // UPDATE PROFILE INFORMATION
    // =====================================

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (address !== undefined) {
      user.address = address;
    }

    if (city !== undefined) {
      user.city = city;
    }

    if (postalCode !== undefined) {
      user.postalCode = postalCode;
    }

    user.profilePic = profilePic;

    // =====================================
    // IMPORTANT
    // EMAIL IS NOT UPDATED
    // =====================================

    await user.save();

    // Get fresh user data
    const updatedUser = await Auth.findById(userId)
      .select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
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
// EXPORTS
// =====================================

module.exports = {
  GetProfile,
  UpdateProfile,
};
```
