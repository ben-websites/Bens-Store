const express = require("express");

const settingsController = require("../Controllers/settingsController");

const settingsRouter = express.Router();

settingsRouter.get(
  "/settings",
  settingsController.getSettings
);

settingsRouter.put(
  "/settings",
  settingsController.updateSettings
);

module.exports = settingsRouter;
