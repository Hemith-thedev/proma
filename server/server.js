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
      .json({ message: "NODETAILS" });
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
        .json({ message: "EXISTS" });
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
              "SUCCESS",
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

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "NODETAILS" });
  }
  database.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) {
      return res.status(400).json({ message: "ACCOUNTNOTFOUND" });
    }
    try {
      const user = result[0];
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: "INCORRECTPASSWORD" });
      if (user.account_status !== "Approved") return res.status(403).json({ message: "WAIT" });
      const safeUser = { ...user, password: undefined }
      return res.status(200).json({ message: "SUCCESS", user: safeUser });
    } catch (error) {
      console.error("❌ An unexpected error occurred during login:", error);
      return res
        .status(500)
        .json({ error: "An unexpected error occurred during login." });
    }
  })
});

app.put("/api/update-status/:id", async (req, res) => {
  const userid = req.params.id;
  const { status } = req.body;
  database.query("UPDATE users SET account_status = 'Approved' where id = ?", [userid], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    try {
      return res.status(200).json({ message: "SUCCESS" });
    } catch (error) {
      console.error("❌ An unexpected error occurred while approving the user:", error);
      return res
        .status(500)
        .json({ error: "An unexpected error occurred while approving the user." });
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
