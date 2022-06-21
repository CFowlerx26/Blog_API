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
const port = process.env.PORT || 2000;

//* Routers
app.use("/blogpost", blogrouter);
app.use("/user", userRouter);
app.use("/auth", authrouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome To My Blog!!!</h1>");
});

app.listen(process.env.PORT || 2000);
