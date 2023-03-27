const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) res.status(401).send("Unauthorized");
  console.log(authHeaders);
  const token = authHeaders.split(" ")[1];

  jwt.verify(() => {
    token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decode) => {
        if (err) res.status(403).send("Token got infected");
        req.user = decode.name;
        next();
      };
  });
};

module.exports = verifyJWT;
