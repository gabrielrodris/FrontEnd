import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "aluno", 
  database: "controle_alunos",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao MySQL");
  }
});

// CRUD Alunos
app.get("/alunos", (req, res) => {
  db.query("SELECT * FROM alunos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/alunos", (req, res) => {
  const { nome, dataNasc, turma, curso, status } = req.body;
  db.query(
    "INSERT INTO alunos (nome, dataNasc, turma, curso, status) VALUES (?, ?, ?, ?, ?)",
    [nome, dataNasc, turma, curso, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, nome, dataNasc, turma, curso, status });
    }
  );
});

app.delete("/alunos/:id", (req, res) => {
  db.query("DELETE FROM alunos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
});

// CRUD Professores
app.get("/professores", (req, res) => {
  db.query("SELECT * FROM professores", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/professores", (req, res) => {
  const { nome, disciplina, email } = req.body;
  db.query(
    "INSERT INTO professores (nome, disciplina, email) VALUES (?, ?, ?)",
    [nome, disciplina, email],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, nome, disciplina, email });
    }
  );
});

app.delete("/professores/:id", (req, res) => {
  db.query("DELETE FROM professores WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
});

app.listen(3001, () =>
  console.log("Servidor rodando em http://localhost:3001")
);
