const express = require("express");
const authrouter = require("./routes/authRouter");
const blogrouter = require("./routes/blogsRouter");
const mongoConfig = require("./config/mongoConfig");
const userRouter = require("./routes/userRouter");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

//* middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
const PORT = process.env.PORT || 2000;

//* Routers
app.use("/blogpost", blogrouter);
app.use("/user", userRouter);
app.use("/auth", authrouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  mongoConfig();
});
