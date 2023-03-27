const JWT = require("jsonwebtoken");
require("dotenv").config();
const CreateError = require("http-errors");

const verifyJWT = (req, res, next) => {
  const auth_headers = req.headers["authorization"];

  if (!auth_headers) {
    next(CreateError.NetworkAuthenticationRequire("You Are Unauthorized"));
  }
  const token = auth_headers.split(" ")[1];
  JWT.verify(() => {
    token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decode) => {
        if (err) return next(CreateError.Unauthorized("Invalid Credentials"));
        req.user = decode.username;
        next();
      };
  });
};

module.exports = verifyJWT;
