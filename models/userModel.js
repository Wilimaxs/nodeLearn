const db = require("../config/db_local");

// Cek user untuk login
const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// membuat user untuk registrasi
const createUser = (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { findUserByUsername, createUser };
