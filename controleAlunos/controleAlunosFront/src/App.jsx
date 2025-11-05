import { useState } from "react";
import Alunos from "./components/Alunos";
import Professores from "./components/Professores";
import Turmas from "./components/Turmas";
import Relatorios from "./components/Relatorios";
import "./App.css";

function App() {
  const [aba, setAba] = useState("alunos");

  return (
    <div className="app-container">
      <header>
        <h1>🎓 Sistema de Controle de Alunos</h1>
        <nav>
          <button onClick={() => setAba("alunos")}>Alunos</button>
          <button onClick={() => setAba("professores")}>Professores</button>
          <button onClick={() => setAba("turmas")}>Turmas</button>
          <button onClick={() => setAba("relatorios")}>Relatórios</button>
        </nav>
      </header>

      <main>
        {aba === "alunos" && <Alunos />}
        {aba === "professores" && <Professores />}
        {aba === "turmas" && <Turmas />}
        {aba === "relatorios" && <Relatorios />}
      </main>
    </div>
  );
}

export default App;
