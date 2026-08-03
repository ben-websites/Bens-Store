const express = require("express");

const statisticsController = require("../Controllers/statisticsController.js");

const statisticsRouter = express.Router();

statisticsRouter.get(
  "/statistics",
  statisticsController.getStatistics
);

module.exports = statisticsRouter;
