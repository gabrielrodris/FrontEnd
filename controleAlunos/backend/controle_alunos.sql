CREATE DATABASE IF NOT EXISTS controle_alunos;
USE controle_alunos;

CREATE TABLE alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  dataNasc DATE,
  turma VARCHAR(50),
  curso VARCHAR(100),
  status VARCHAR(20)
);

CREATE TABLE professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  disciplina VARCHAR(100),
  email VARCHAR(100)
);
