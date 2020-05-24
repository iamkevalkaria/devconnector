const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // 1. Get the token form the header
  const token = req.header("x-auth-token");

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  // 3. Verify token - if there is one
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
