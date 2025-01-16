const express = require("express");
const authRoutes = require("./routes/authRoute");
const authenticateToken = require("./middleware/protected");

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = app;
