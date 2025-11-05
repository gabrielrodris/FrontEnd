import { useState } from "react";

function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [nova, setNova] = useState({ nome: "", disciplina: "", professor: "" });

  const salvar = () => {
    setTurmas([...turmas, { ...nova, id: Date.now() }]);
    setNova({ nome: "", disciplina: "", professor: "" });
  };

  const excluir = (id) => setTurmas(turmas.filter((t) => t.id !== id));

  return (
    <div>
      <h2>🏫 Gerenciamento de Turmas</h2>
      <div className="form">
        <input
          placeholder="Turma"
          value={nova.nome}
          onChange={(e) => setNova({ ...nova, nome: e.target.value })}
        />
        <input
          placeholder="Disciplina"
          value={nova.disciplina}
          onChange={(e) => setNova({ ...nova, disciplina: e.target.value })}
        />
        <input
          placeholder="Professor"
          value={nova.professor}
          onChange={(e) => setNova({ ...nova, professor: e.target.value })}
        />
        <button onClick={salvar}>Salvar</button>
      </div>

      <div className="cards-container">
        {turmas.map((t) => (
          <div key={t.id} className="turma-card">
            <h3>{t.nome}</h3>
            <p>📘 {t.disciplina}</p>
            <p>👨‍🏫 {t.professor}</p>
            <button onClick={() => excluir(t.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Turmas;
