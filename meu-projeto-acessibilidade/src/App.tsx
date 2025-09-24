import React from "react";
import AccessibleButton from "./components/AccessibleButton";

export default function App() {
  const handleClick = () => alert("Botão acessível clicado!");
  return (
    <>
      <div className="container">
        <header>
          <h1 tabIndex={0}>Projeto de Acessibilidade</h1>
          <nav aria-label="Menu principal">
            <ul>
              <li>
                <a href="#conteudo">Ir para conteúdo</a>
              </li>
              <li>
                <a href="#rodape">Ir para rodapé</a>
              </li>
            </ul>
          </nav>
        </header>

        <main id="conteudo">
          <h2>Recursos de Acessibilidade</h2>
          <p>Este projeto demonstra boas práticas de acessibilidade em React usando Vite.</p>
          <img src="https://via.placeholder.com/300x150" alt="Imagem ilustrativa de acessibilidade digital" />
          <AccessibleButton label="Clique aqui" onClick={handleClick}></AccessibleButton>
        </main>

        <footer id="rodape" role="contentinfo">
          <p>2025 - Projeto de Acessibilidade</p>
        </footer>
      </div>
    </>
  );
}
