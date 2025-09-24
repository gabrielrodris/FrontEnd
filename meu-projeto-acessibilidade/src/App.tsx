
// ARIA (Accessible Rich Internet Applications) é um conjunto de atributos que melhora a acessibilidade de elementos HTML para tecnologias assistivas, como leitores de tela.
// Usamos ARIA quando o HTML padrão não fornece informações suficientes para todos os usuários.
import AccessibleButton from "./components/AccessibleButton";

export default function App() {
  const handleClick = () => alert("Botão acessível clicado!");
  return (
    <>
      <div className="container">
        <header>
          {/* O HTML já é suficiente para o título, mas tabIndex permite navegação por teclado. Não é necessário ARIA aqui. */}
          <h1 tabIndex={0}>Projeto de Acessibilidade</h1>
          {/* Usamos aria-label para descrever o propósito do menu para leitores de tela. ARIA é útil quando o HTML não é suficiente para transmitir significado. */}
          <nav aria-label="Menu principal">
            <ul>
              <li>
                {/* O HTML do link já é suficiente, pois <a> é reconhecido por tecnologias assistivas. Não usamos ARIA aqui. */}
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
          <p>
            Este projeto demonstra boas práticas de acessibilidade em React
            usando Vite.
          </p>
          {/* O atributo alt na imagem já garante acessibilidade, não é necessário ARIA extra. */}
          <img
            src="https://www.ufsm.br/app/uploads/sites/391/2015/09/LOGO_ACESSIBILIDADE_-_AGOSTO_2015.jpg"
            alt="Imagem ilustrativa de acessibilidade digital"
            width={300}
            height={300}
          />
          {/* O botão usa aria-label para garantir que o leitor de tela leia o propósito do botão, mesmo que o texto não seja visível. ARIA resolve problemas de contexto e descrição para tecnologias assistivas. */}
          <AccessibleButton
            label="Clique aqui"
            onClick={handleClick}
          ></AccessibleButton>
        </main>


        {/* Usamos role="contentinfo" para indicar que o footer contém informações sobre o conteúdo da página. ARIA é necessário aqui para informar o papel do elemento. */}
        <footer id="rodape" role="contentinfo">
          <p>2025 - Projeto de Acessibilidade</p>
        </footer>
      </div>
    </>
  );
}
