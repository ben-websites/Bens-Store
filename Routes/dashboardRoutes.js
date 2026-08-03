const express = require("express");
const dashboardrouter = express.Router();

const dashboardController = require("../Controllers/dashboardController.js");

dashboardrouter.get("/dashboard", dashboardController.getDashboard);

module.exports = dashboardrouter;
