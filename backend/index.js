const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/database.js");
const cors = require("cors");
const fs = require("fs");
const authRoutes = require("./routes/auth.routes.js");
const customerRoutes = require("./routes/customer.routes.js");
const vendorRoutes = require("./routes/vendor.routes.js");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();

// register routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", customerRoutes);
app.use("/api/v1", vendorRoutes);

app.get("/", (req, res) => {
  res.send("Urban Aid API is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});