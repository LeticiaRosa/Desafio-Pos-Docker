const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const db = new Pool({
  user: "admin",
  host: "db",
  database: "minhaapi",
  password: "admin",
  port: 5432,
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Test endpoint
app.get("/api", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      message: "API conectada ao banco com sucesso!",
      now: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro na conexão com o banco." });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    // Create table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await db.query("SELECT * FROM users ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// Add new user
app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório." });
    }

    // Create table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await db.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar usuário." });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`API rodando em http://localhost:${port}`);
});
