const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: "Ben's Store",
    },

    storeEmail: {
      type: String,
      default: "sabihuddin309@gmail.com",
    },

    storePhone: {
      type: String,
      default: "+92 324 2244688",
    },

    storeAddress: {
      type: String,
      default: "Karachi, Pakistan",
    },

    storeOpen: {
      type: Boolean,
      default: true,
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    customerRegistration: {
      type: Boolean,
      default: true,
    },

    cashOnDelivery: {
      type: Boolean,
      default: true,
    },

    cardPayment: {
      type: Boolean,
      default: true,
    },

    newOrders: {
      type: Boolean,
      default: true,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
