const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Database Pool
const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "proma",
});

// Test Database Connection
(async () => {
  try {
    const connection = await database.getConnection();
    console.log("✅ Successfully connected to the database!");
    connection.release();
  } catch (error) {
    console.error(
      "❌ Error connecting to the database:",
      error
    );
  }
})();

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender } = req.body;
    if (!firstname || !email || !password) {
      return res.status(400).json({
        message: "NODETAILS",
      });
    }
    const [existingUsers] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: "EXISTS",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(
      password,
      salt
    );
    const [result] = await database.query(
      `
      INSERT INTO users
      (
        first_name,
        last_name,
        email,
        password,
        gender,
        account_status
      )
      VALUES (?, ?, ?, ?, ?, 'Pending')
      `,
      [
        firstname,
        lastname,
        email,
        hashedPassword,
        gender,
      ]
    );
    return res.status(201).json({
      message: "SUCCESS",
      userid: result.insertId,
    });
  } catch (error) {
    console.error(
      "❌ Registration Error:",
      error
    );
    return res.status(500).json({
      error:
        "An unexpected error occurred during registration.",
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "NODETAILS",
      });
    }
    const [users] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (users.length === 0) {
      return res.status(400).json({
        message: "ACCOUNTNOTFOUND",
      });
    }
    const user = users[0];
    const isPasswordValid =
      await bcryptjs.compare(
        password,
        user.password
      );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "INCORRECTPASSWORD",
      });
    }
    if (user.account_status !== "Approved") {
      return res.status(403).json({
        message: "WAIT",
      });
    }
    const safeUser = {
      ...user,
      password: undefined,
    };
    return res.status(200).json({
      message: "SUCCESS",
      user: safeUser,
    });
  } catch (error) {
    console.error(
      "❌ Login Error:",
      error
    );
    return res.status(500).json({
      error:
        "An unexpected error occurred during login.",
    });
  }
});

// Approve User
app.put("/api/update-status/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    await database.query(
      `
      UPDATE users
      SET account_status = 'Approved'
      WHERE id = ?
      `,
      [userid]
    );
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (error) {
    console.error(
      "❌ Approve User Error:",
      error
    );
    return res.status(500).json({
      error:
        "An unexpected error occurred while approving the user.",
    });
  }
});

// Fetch Users
app.get("/api/get/users", async (_, res) => {
  try {
    const [users] = await database.execute(
      "SELECT * FROM users"
    );
    return res.status(200).json(users);
  } catch (error) {
    console.error(
      "❌ Fetch Users Error:",
      error
    );
    return res.status(500).json({
      error:
        "An unexpected error occurred while fetching the users.",
    });
  }
});

// Fetch user
app.get("/api/get/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const [users] = await database.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    return res.status(200).json(users[0]);
  } catch (error) {
    console.error(
      "❌ Fetch User Error:",
      error
    );
    return res.status(500).json({
      error:
        "An unexpected error occurred while fetching the user.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});