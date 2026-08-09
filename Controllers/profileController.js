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


const UpdateProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const {
            name,
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

module.exports = {
  getProfile,
  updateProfile,
};
