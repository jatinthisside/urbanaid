const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/database.js");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes.js");
const customerRoutes = require("./routes/customer.routes.js");
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});