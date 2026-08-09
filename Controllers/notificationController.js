const Notification = require("../Models/notificationModel");

// =====================================
// GET ALL NOTIFICATIONS
// =====================================

const getNotifications = async (req, res) => {
try {
const notifications = await Notification.find()
.sort({ createdAt: -1 })
.populate("userId", "name email");

```
res.json({
  success: true,
  data: notifications,
});
```

} catch (error) {
console.log("Get Notifications Error:", error);

```
res.status(500).json({
  success: false,
  message: error.message,
});
```

}
};

// =====================================
// GET UNREAD COUNT
// =====================================

const getUnreadCount = async (req, res) => {
try {
const count = await Notification.countDocuments({
isRead: false,
});

```
res.json({
  success: true,
  count,
});
```

} catch (error) {
console.log("Unread Count Error:", error);

```
res.status(500).json({
  success: false,
  message: error.message,
});
```

}
};

// =====================================
// MARK ONE AS READ
// =====================================

const markAsRead = async (req, res) => {
try {
const notification = await Notification.findByIdAndUpdate(
req.params.id,
{ isRead: true },
{ new: true }
);

```
if (!notification) {
  return res.status(404).json({
    success: false,
    message: "Notification not found",
  });
}

res.json({
  success: true,
  message: "Notification marked as read",
  data: notification,
});
```

} catch (error) {
console.log("Mark Notification Error:", error);

```
res.status(500).json({
  success: false,
  message: error.message,
});
```

}
};

// =====================================
// MARK ALL AS READ
// =====================================

const markAllAsRead = async (req, res) => {
try {
await Notification.updateMany(
{ isRead: false },
{ $set: { isRead: true } }
);

```
res.json({
  success: true,
  message: "All notifications marked as read",
});
```

} catch (error) {
console.log("Mark All Notifications Error:", error);

```
res.status(500).json({
  success: false,
  message: error.message,
});
```

}
};

module.exports = {
getNotifications,
getUnreadCount,
markAsRead,
markAllAsRead,
};
