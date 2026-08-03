const express = require("express");

const contactController = require("../Controllers/contactController.js");

const contactRouter = express.Router();

contactRouter.post("/contact", contactController.addMessage);

contactRouter.get("/messages", contactController.getMessages);

contactRouter.get("/messages/:id", contactController.getMessageById);

contactRouter.delete(
  "/deletemessage/:id",
  contactController.deleteMessage
);

module.exports = contactRouter;
