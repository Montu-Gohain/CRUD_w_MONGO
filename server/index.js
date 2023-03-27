const express = require("express");
const CreateError = require("http-errors");
const UserRotuer = require("./routes/UserRoutes");

require("dotenv").config();
require("./helpers/init_mongo.js");

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Learning CRUD Operations with Express and MongoDB.",
  });
});

app.use("/api/v1/users", UserRotuer);

app.use("*/", (req, res, next) => {
  next(CreateError.NotFound("Page not found...check your url!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("I am Running at port : ", PORT));
