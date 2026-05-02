const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Create a connection pool to the MySQL database
const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "proma",
});

// 2. Test the database connection
database.getConnection((err) => {
  try {
    if (err) {
      console.error("❌ Error connecting to the database:", err);
    } else {
      console.log("✅ Successfully connected to the database!");
    }
  } catch (error) {
    console.error(
      "❌ An unexpected error occurred while connecting to the database:",
      error,
    );
    console.error(
      "Please check your database configuration and ensure the MySQL server is running.",
    );
    console.error("Detailed error information:", error);
  }
});

// 3. User registration endpoint
app.post("/api/register", (req, res) => {
  const { firstname, lastname, email, password, gender } = req.body;
  if (!firstname || !email || !password) {
    return res
      .status(400)
      .json({ message: "Hey buddy, fill the details first!" });
  }
  const QUERY = "SELECT * FROM users where email = ?";
  database.query(QUERY, [email], async (err, result) => {
    if (err) {
      console.error("❌ Error checking for existing user:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.length > 0) {
      return res
        .status(400)
        .json({ message: "This account already registered, try logging in!" });
    }
    try {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const INSERT_QUERY = `
          INSERT INTO users (first_name, last_name, email, password, gender, account_status)
          VALUES (?, ?, ?, ?, ?, 'Pending')
        `;
      database.query(
        INSERT_QUERY,
        [firstname, lastname, email, hashedPassword, gender],
        (err, result) => {
          if (err) {
            console.error("❌ Error inserting user into the database:", err);
            return res.status(500).json({ error: err.message });
          }
          return res.status(201).json({
            message:
              "Registration successful! Your account is pending approval.",
            userid: result.insertId,
          });
        },
      );
    } catch (error) {
      console.error(
        "❌ An unexpected error occurred during registration:",
        error,
      );
      return res
        .status(500)
        .json({ error: "An unexpected error occurred during registration." });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  try {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error(
      "❌ An unexpected error occurred while starting the server:",
      error,
    );
  }
});
