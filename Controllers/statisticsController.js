const Product = require("../Models/productModel");
const Order = require("../Models/orderModel");
const Auth = require("../Models/authModel");
const Contact = require("../Models/contactModel");

const getStatistics = async (req, res) => {
  try {
    // Dashboard Counts
    const totalProducts = await Product.countDocuments();

    const totalCustomers = await Auth.countDocuments({
      role: "user",
    });

    const totalOrders = await Order.countDocuments();

    const totalMessages = await Contact.countDocuments();

    // Revenue
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    // Order Status Counts
    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const processingOrders = await Order.countDocuments({
      orderStatus: "Processing",
    });

    const shippedOrders = await Order.countDocuments({
      orderStatus: "Shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });

    // Monthly Revenue
    const monthlyRevenue = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Monthly Orders
    const monthlyOrders = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Top Selling Products
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },

      {
        $group: {
          _id: "$products.title",
          totalSold: {
            $sum: "$products.quantity",
          },
        },
      },

      {
        $sort: {
          totalSold: -1,
        },
      },

      {
        $limit: 5,
      },
    ]);

    // Top Customers
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: "$customerEmail",

          customerName: {
            $first: "$customerName",
          },

          totalOrders: {
            $sum: 1,
          },

          totalSpent: {
            $sum: "$totalAmount",
          },
        },
      },

      {
        $sort: {
          totalSpent: -1,
        },
      },

      {
        $limit: 5,
      },
    ]);

    // Recent Orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      totalProducts,
      totalCustomers,
      totalOrders,
      totalMessages,

      totalRevenue,

      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,

      monthlyRevenue,
      monthlyOrders,

      topProducts,
      topCustomers,

      recentOrders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStatistics,
};