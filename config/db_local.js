const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_learn",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1); // Keluar jika gagal koneksi
  }
  console.log("Connected to database");
});

module.exports = db;
