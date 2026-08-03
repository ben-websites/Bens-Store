const express = require("express");

const statisticsController = require("../Controllers/statisticsController");

const statisticsRouter = express.Router();

statisticsRouter.get(
  "/statistics",
  statisticsController.getStatistics
);

module.exports = statisticsRouter;