const express = require("express");
const authrouter = require("./routes/authRouter");
const blogrouter = require("./routes/blogsRouter");
const mongoConfig = require("./config/mongoConfig");
const userRouter = require("./routes/userRouter");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

//* middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
const PORT = process.env.PORT || 2000;

//* Routers
app.use("/blogs", blogrouter);
app.use("/users", userRouter);
app.use("/auth", authrouter);

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  mongoConfig();
});
