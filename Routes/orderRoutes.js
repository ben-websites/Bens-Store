const express = require("express");
const orderController = require("../Controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/placeorder", orderController.placeOrder);

orderRouter.get("/orders", orderController.getOrders);

orderRouter.get("/order/:id", orderController.getOrderById);   // <-- ADD THIS

orderRouter.get("/myorder/:id", orderController.getOrderById);

orderRouter.get("/myorders/:id", orderController.getMyOrders);

orderRouter.put("/updateorder/:id", orderController.updateOrder);

orderRouter.delete("/deleteorder/:id", orderController.deleteOrder);

module.exports = orderRouter;