const express = require("express");

const {
getNotifications,
getUnreadCount,
markAsRead,
markAllAsRead,
} = require("../Controllers/notificationController");

const router = express.Router();

router.get("/notifications", getNotifications);

router.get("/notifications/unread", getUnreadCount);

router.put("/notifications/:id/read", markAsRead);

router.put("/notifications/read-all", markAllAsRead);

module.exports = router;
