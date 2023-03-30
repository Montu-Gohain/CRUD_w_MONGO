const express = require("express");
const CreateError = require("http-errors");
const UserRotuer = require("./routes/UserRoutes");
const EmployeeRouter = require("./routes/EmployeRoutes");
const { verifyAccessToken } = require("./helpers/jwt_helper");

require("dotenv").config();
require("./helpers/init_mongo.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "My First Node js Backend Application deployment.",
  });
});

app.use("/api/v1/users", UserRotuer);
app.use("/api/v1/employees", verifyAccessToken, EmployeeRouter);

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
