const Auth = require("../Models/authModel.js");
const Order = require("../Models/orderModel.js");

const getCustomers = async (req, res) => {
  try {
    const customers = await Auth.find({ role: "user" }).select("-password");

    const data = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({ userId: customer._id });

        const totalOrders = orders.length;

        const totalSpent = orders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        return {
          ...customer._doc,
          totalOrders,
          totalSpent,
        };
      })
    );

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Auth.findById(req.params.id).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const orders = await Order.find({
      userId: customer._id,
    });

    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      success: true,
      data: {
        ...customer._doc,
        orders,
        totalOrders: orders.length,
        totalSpent,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
};
