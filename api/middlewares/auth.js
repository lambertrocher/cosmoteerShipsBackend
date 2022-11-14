const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.send("Error no token.");
  }
  try {
    req.decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.send("Invalid token.");
  }
}

module.exports = auth;
