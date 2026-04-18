// imports / requires
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// middleware
const server = express();
server.use(cors());
server.use(express.json());

// database connection pool
const database = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "techbox_logs",
  })
  .promise();

server.post("/api/create/user", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const [existing] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    if (existing.length > 0) return res.status(409).json({ message: "EXISTS" });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    await database.execute(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, phone, role],
    );
    return res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "ERROR" });
  }
});

server.put("/api/update/user/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;
    const [existing] = await database.execute(
      "SELECT * FROM users WHERE email = ? AND id != ?",
      [email, id],
    );
    if (existing.length > 0) return res.status(409).json({ message: "EXISTS" });
    const [result] = await database.execute(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, id],
    );
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/users", async (_, res) => {
  try {
    const [users] = await database.execute("SELECT id, name, email, phone, role FROM users");
    if (users.length > 0) return res.status(200).json(users);
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    console.error("Error fetching team:", error);
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/user/:id", async (req, res) => {
  try {
    const [rows] = await database.query("SELECT id, name, email, phone, role FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length > 0) return res.status(200).json(rows[0]);
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.delete("/api/delete/user/:id", async (req, res) => {
  try {
    const [result] = await database.execute("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.post("/api/create/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "MISSING_DATA" });
    }
    await database.execute(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone, message]
    );
    return res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({ message: "ERROR" });
  }
});

server.put("/api/update/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, name, phone } = req.body;
    await database.execute(
      "UPDATE contacts SET status = ?, name = ?, phone = ? WHERE id = ?",
      [status, name, phone, id]
    );
    return res.status(200).json({ message: "CONTACT_UPDATED_SUCCESSFULLY" });
  } catch (error) {
    return res.status(500).json({ message: "UPDATE_FAILED" });
  }
});

server.get("/api/fetch/contacts", async (_, res) => {
  try {
    const [messages] = await database.execute("SELECT * FROM contacts ORDER BY created_at DESC");
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [contact] = await database.execute("SELECT * FROM contacts WHERE id = ?", [id]);
    if (contact.length === 0) {
      return res.status(404).json({ message: "CONTACT_NOT_FOUND" });
    }
    return res.status(200).json(contact[0]);
  } catch (error) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
});

server.delete("/api/delete/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await database.execute("DELETE FROM contacts WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "NOTHING_TO_DELETE" });
    }
    return res.status(200).json({ message: "RECORD_TERMINATED" });
  } catch (error) {
    return res.status(500).json({ message: "DELETION_ERROR" });
  }
});

server.post("/api/create/team", async (req, res) => {
  try {
    const { name, batch_no } = req.body;
    const [existing] = await database.query(
      "SELECT * FROM teams WHERE name = ? AND batch_no = ?",
      [name, batch_no],
    );
    if (existing.length > 0) return res.status(409).json({ message: "EXISTS" });
    await database.execute("INSERT INTO teams (name, batch_no) VALUES(?, ?)", [
      name,
      batch_no,
    ]);
    return res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    console.error("Error creating team:", error);
    return res.status(500).json({ message: "ERROR" });
  }
});

server.put("/api/update/team/:id", async (req, res) => {
  try {
    const { name, batch_no } = req.body;
    const { id } = req.params;
    const [result] = await database.execute(
      "UPDATE teams SET name = ?, batch_no = ? WHERE id = ?",
      [name, batch_no, id],
    );
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/teams", async (_, res) => {
  try {
    const [teams] = await database.execute("SELECT * FROM teams");
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/team/:id", async (req, res) => {
  try {
    const [rows] = await database.query("SELECT * FROM teams WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length > 0) return res.status(200).json(rows[0]);
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.delete("/api/delete/team/:id", async (req, res) => {
  try {
    const [result] = await database.execute("DELETE FROM teams WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.post("/api/create/teammate", async (req, res) => {
  try {
    const { name, register_no, email, phone, gender, assigned_works } =
      req.body;
    const [existing] = await database.query(
      "SELECT * FROM teammates WHERE email = ?",
      [email],
    );
    if (existing.length > 0) return res.status(409).json({ message: "EXISTS" });
    await database.execute(
      "INSERT INTO teammates (name, register_no, email, phone, gender, assigned_works) VALUES(?, ?, ?, ?, ?, ?)",
      [name, register_no, email, phone, gender, assigned_works],
    );
    return res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.put("/api/update/teammate/:id", async (req, res) => {
  try {
    const { name, register_no, email, phone, gender, assigned_works } =
      req.body;
    const { id } = req.params;
    const [result] = await database.execute(
      "UPDATE teammates SET name = ?, register_no = ?, email = ?, phone = ?, gender = ?, assigned_works = ? WHERE id = ?",
      [name, register_no, email, phone, gender, assigned_works, id],
    );
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/teammates", async (_, res) => {
  try {
    const [rows] = await database.execute("SELECT * FROM teammates");
    const processedRows = rows.map((row) => ({
      ...row,
      assigned_works:
        typeof row.assigned_works === "string"
          ? JSON.parse(row.assigned_works)
          : row.assigned_works,
    }));
    return res.status(200).json(processedRows);
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/teammate/:id", async (req, res) => {
  try {
    const [rows] = await database.query(
      "SELECT * FROM teammates WHERE id = ?",
      [req.params.id],
    );
    if (rows.length > 0) return res.status(200).json(rows[0]);
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.delete("/api/delete/teammate/:id", async (req, res) => {
  try {
    const [result] = await database.execute(
      "DELETE FROM teammates WHERE id = ?",
      [req.params.id],
    );
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.post("/api/create/log", async (req, res) => {
  try {
    const { label, status, assigner } = req.body;
    const [existing] = await database.execute(
      "SELECT * FROM logs WHERE label = ? AND status = ? AND assigner = ?",
      [label, status, assigner],
    );
    if (existing.length > 0) return res.status(409).json({ message: "EXISTS" });
    await database.execute(
      "INSERT INTO logs(label, status, assigner) VALUES (?, ?, ?)",
      [label, status, assigner],
    );
    return res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.put("/api/update/log/:id", async (req, res) => {
  try {
    const { label, status, assigner } = req.body;
    const { id } = req.params;

    const [result] = await database.execute(
      "UPDATE logs SET label = ?, status = ?, assigner = ? WHERE id = ?",
      [label, status, assigner, id],
    );
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/logs", async (_, res) => {
  try {
    const [logs] = await database.execute("SELECT * FROM logs");
    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

server.get("/api/fetch/log/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await database.query("SELECT * FROM logs WHERE id = ?", [
      id,
    ]);
    if (rows.length > 0) {
      return res.status(200).json(rows[0]);
    } else {
      return res.status(404).json({ message: "NOTFOUND" });
    }
  } catch (error) {
    console.error("Error while fetching log by ID:", error);
    return res.status(500).json({ message: "ERROR" });
  }
});

server.delete("/api/delete/log/:id", async (req, res) => {
  try {
    const [result] = await database.execute("DELETE FROM logs WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows > 0)
      return res.status(200).json({ message: "SUCCESS" });
    return res.status(404).json({ message: "NOTFOUND" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
});

// server listening
server.listen(5000, () => {
  console.log("✅ Server is running on PORT 5000!");
});
