//npm --prefix ./Views run dev

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connect_db.js");
const authRoutes = require("./Routes/authRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/productRoutes.js");
const dashboardRoutes = require("./Routes/dashboardRoutes.js");
const orderRouter = require("./Routes/orderRoutes.js");
const customerRouter = require("./Routes/customerRoutes.js");
const contactRouter = require("./Routes/contactRoutes.js");
const statisticsRouter = require("./Routes/statisticsRoutes.js");
const settingsRouter = require("./Routes/settingsRoutes.js");
const profileRoutes = require("./Routes/profileRoutes.js");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://react-olive-three.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(dashboardRoutes);
app.use(orderRouter);
app.use(customerRouter);
app.use(contactRouter);
app.use(statisticsRouter);
app.use("/", settingsRouter);
app.use(profileRoutes);

//Localhost
//  connectDB().then(() => {

//   app.listen(3000);
//  });
connectDB();
module.exports = app;
