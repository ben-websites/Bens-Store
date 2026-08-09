const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
type: {
type: String,
enum: ["login", "order", "message"],
required: true,
},

```
title: {
  type: String,
  required: true,
},

message: {
  type: String,
  required: true,
},

userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Auth",
  default: null,
},

orderId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Order",
  default: null,
},

isRead: {
  type: Boolean,
  default: false,
},
```

},
{
timestamps: true,
versionKey: false,
}
);

module.exports = mongoose.model(
"Notification",
notificationSchema,
"notifications"
);
