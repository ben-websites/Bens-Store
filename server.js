//npm --prefix ./Views run dev

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connect_db");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes.js");
const dashboardRoutes = require("./Routes/dashboardRoutes");
const orderRouter = require("./Routes/orderRoutes");
const customerRouter = require("./Routes/customerRoutes.js");
const contactRouter = require("./Routes/contactRoutes.js");
const statisticsRouter = require("./Routes/statisticsRoutes");
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(dashboardRoutes);
app.use(orderRouter);
app.use(customerRouter);
app.use(contactRouter);
app.use(statisticsRouter);

//Localhost
//  connectDB().then(() => {

//   app.listen(3000);
//  });
connectDB();
module.exports = app;