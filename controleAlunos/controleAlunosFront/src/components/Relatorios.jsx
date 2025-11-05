import { useState } from "react";

function Relatorios() {
  const [dados] = useState({
    totalAlunos: 42,
    mediaNotas: 7.5,
    frequenciaMedia: 88,
    alunosReprovados: 5,
  });

  return (
    <div>
      <h2>📊 Relatórios e Estatísticas</h2>
      <div className="cards-container">
        <div className="relatorio-card">
          🎓 Total de alunos: {dados.totalAlunos}
        </div>
        <div className="relatorio-card">
          📈 Média de notas: {dados.mediaNotas}
        </div>
        <div className="relatorio-card">
          📅 Frequência média: {dados.frequenciaMedia}%
        </div>
        <div className="relatorio-card">
          ❌ Reprovados: {dados.alunosReprovados}
        </div>
      </div>
    </div>
  );
}

export default Relatorios;
