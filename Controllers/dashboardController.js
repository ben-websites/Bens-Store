const Product = require("../Models/productModel.js");
const User = require("../Models/userModel.js");
const Order = require("../Models/orderModel.js");

const getDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Count Orders
    const totalOrders = await Order.countDocuments();

    // Calculate Revenue
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenue.length > 0 ? revenue[0].total : 0;

    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      latestProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
