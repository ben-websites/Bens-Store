const Auth = require("../Models/authModel");

const getProfile = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id).select("-password");

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      city,
      postalCode,
      profilePic,
    } = req.body;

    const user = await Auth.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || "";
    user.address = address || "";
    user.city = city || "";
    user.postalCode = postalCode || "";
    user.profilePic = profilePic || "";

    await user.save();

    const updatedUser = await Auth.findById(req.params.id)
      .select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getProfile,
  updateProfile,
};
