const jwt = require("jsonwebtoken");
const secretKey = "4Fn5T7k8Lm9P2X1Rf6Yz3Qj0Wc4As8Mv";

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
