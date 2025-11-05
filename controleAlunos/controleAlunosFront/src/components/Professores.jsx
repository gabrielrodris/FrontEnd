import { useState, useEffect } from "react";

function Professores() {
  const [professores, setProfessores] = useState([]);
  const [novo, setNovo] = useState({ nome: "", disciplina: "", email: "" });

  const carregar = async () => {
    const res = await fetch("http://localhost:3001/professores");
    setProfessores(await res.json());
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    await fetch("http://localhost:3001/professores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    });
    carregar();
    setNovo({ nome: "", disciplina: "", email: "" });
  };

  const excluir = async (id) => {
    await fetch(`http://localhost:3001/professores/${id}`, {
      method: "DELETE",
    });
    carregar();
  };

  return (
    <div>
      <h2>👨‍🏫 Cadastro de Professores</h2>
      <div className="form">
        <input
          placeholder="Nome"
          value={novo.nome}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
        />
        <input
          placeholder="Disciplina"
          value={novo.disciplina}
          onChange={(e) => setNovo({ ...novo, disciplina: e.target.value })}
        />
        <input
          placeholder="Email"
          value={novo.email}
          onChange={(e) => setNovo({ ...novo, email: e.target.value })}
        />
        <button onClick={salvar}>Salvar</button>
      </div>

      <div className="cards-container">
        {professores.map((p) => (
          <div key={p.id} className="prof-card">
            <h3>{p.nome}</h3>
            <p>📘 {p.disciplina}</p>
            <p>📧 {p.email}</p>
            <button onClick={() => excluir(p.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Professores;
