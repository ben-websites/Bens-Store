const Contact = require("../Models/contactModel.js");
const Notification = require("../Models/notificationModel.js");

// Add Message
const addMessage = async (req, res) => {
  try {
    const message = await Contact.create(req.body);

    // Create admin notification
    // Notification failure should NOT stop the message from being sent.
    Notification.create({
      type: "message",
      title: "New Contact Message",
      message: `${message.name || "A customer"} has sent a new message.`,
      userId: message.userId || null,
    }).catch((error) => {
      console.log(
        "Message Notification Error:",
        error.message
      );
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Messages
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Message
const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Message
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addMessage,
  getMessages,
  getMessageById,
  deleteMessage,
};
