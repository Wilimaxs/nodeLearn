const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();

// Initialize
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server Listen In port ${port}`);
});

// Home endpoint
app.get("/", (req, res) => {
  res.send("Hello, World");
});

// example data store
const data = [
  { id: 1, name: "item 1" },
  { id: 2, name: "item 2" },
  { id: 3, name: "item 3" },
];

// middleware to parse json
app.use(express.json());

// post a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Get data
app.get("/item", (req, res) => {
  res.json(data);
});

// get data by spesific item by id
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ error: "Item Not Found" });
  } else {
    res.json(item);
  }
});

// update data
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateItem = req.body;
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: "item not found" });
  } else {
    data[index] = { ...data[index], ...updateItem };
    res.json(data[index]);
  }
});

// delete data
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === id);
  if (index == -1) {
    res.status(404).json({ error: "item not found" });
  } else {
    const deleteItem = data.splice(index, 1);
    res.json(deleteItem[0]);
  }
});

// AUTH EXAMPLE

// secret Key for Auth
const secretKey = "4Fn5T7k8Lm9P2X1Rf6Yz3Qj0Wc4As8Mv";

// Sample user data (replace with a real database)
const users = [
  {
    id: 1,
    username: "user1",
    password: bcrypt.hashSync("password1", 10), //generate hasing manually
  }, // Hashed password: "password1"
  {
    id: 2,
    username: "user2",
    password: bcrypt.hashSync("password2", 10), //generate hasing manually
  }, // Hashed password: "password2"
];

// fungction for cek user and cek password with hasing
function authenticateUser(username, password) {
  const user = users.find((user) => user.username === username);
  if (!user) {
    return null; // User not found
  }

  if (bcrypt.compareSync(password, user.password)) {
    return user; // Password is correct
  }

  return null; // Password is incorrect
}

// route
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);

  if (!user) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey,
    {
      expiresIn: "1h", // Token expiration time
    }
  ); //token is embedd in token so that token use for authorization it can be know about aserId, username, secretkey, and expiration

  res.json({ token });
});

// secure header for request
function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(404).json({ error: "Authentication token missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(404).json({ error: "Authentication token missing" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.json(403).json({ error: "tokken invalid" });
    }
    req.user = user;
    next(); // Continue to the protected route
  });
}

// Example usage:
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
