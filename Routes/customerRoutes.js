const express = require("express");
const router = express.Router();

const customerController = require("../Controllers/customerController.js");

router.get("/customers", customerController.getCustomers);

router.get("/customers/:id", customerController.getCustomerById);

module.exports = router;
