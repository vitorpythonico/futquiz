import footballIcon from './assets/football-icon.png';
import init from './game.ts';

document.querySelector<HTMLMainElement>("#app")!.innerHTML = `
  <article class="card">
    <h1>
      <img src=${footballIcon} alt="football icon" />
      FutQuiz
    </h1>
    <p>Teste seus conhecimentos sobre futebol!</p>
    <button>Iniciar</button>
  </article>
`
document.querySelector<HTMLButtonElement>('button').addEventListener('click', init);
