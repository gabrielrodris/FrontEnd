import { useState, useEffect } from "react";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [novo, setNovo] = useState({
    nome: "",
    dataNasc: "",
    turma: "",
    curso: "",
    status: "ativo",
  });

  const carregar = async () => {
    const res = await fetch("http://localhost:3001/alunos");
    setAlunos(await res.json());
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    await fetch("http://localhost:3001/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    });
    carregar();
    setNovo({ nome: "", dataNasc: "", turma: "", curso: "", status: "ativo" });
  };

  const excluir = async (id) => {
    await fetch(`http://localhost:3001/alunos/${id}`, { method: "DELETE" });
    carregar();
  };

  return (
    <div>
      <h2>📘 Cadastro de Alunos</h2>
      <div className="form">
        <input
          placeholder="Nome"
          value={novo.nome}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
        />
        <input
          type="date"
          value={novo.dataNasc}
          onChange={(e) => setNovo({ ...novo, dataNasc: e.target.value })}
        />
        <input
          placeholder="Turma"
          value={novo.turma}
          onChange={(e) => setNovo({ ...novo, turma: e.target.value })}
        />
        <input
          placeholder="Curso"
          value={novo.curso}
          onChange={(e) => setNovo({ ...novo, curso: e.target.value })}
        />
        <select
          value={novo.status}
          onChange={(e) => setNovo({ ...novo, status: e.target.value })}
        >
          <option value="ativo">Ativo</option>
          <option value="trancado">Trancado</option>
          <option value="formado">Formado</option>
        </select>
        <button onClick={salvar}>Salvar</button>
      </div>

      <div className="cards-container">
        {alunos.map((a) => (
          <div key={a.id} className="aluno-card">
            <h3>{a.nome}</h3>
            <p>📅 {a.dataNasc}</p>
            <p>📘 {a.curso}</p>
            <p>🎯 {a.status}</p>
            <button onClick={() => excluir(a.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alunos;
