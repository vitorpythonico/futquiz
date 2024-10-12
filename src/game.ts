import questionsJson from './data/questions.json';
import footballIcon from './assets/football-icon.png';

export default function init(e: Event) {
	const card = document.querySelector('.card');
	const questions =  Object.keys(questionsJson);
	let totalOfQuestions = questions.length;
	let currentQuestion = questions[0];
	let score = 0;

	card.innerHTML = `
    <h1>
      <img src=${footballIcon} alt="football icon" />
      FutQuiz
    </h1>
	`;

		function loadQuestion(q: number) {
			if (currentQuestion <= totalOfQuestions) {
				cleanCard();
				const description = document.createElement('div');
		    description.innerHTML = `<span>${questionsJson[q].description}</span>`;
		    description.classList.add('card__description');
		    card.append(description);

				const cardOptions = document.createElement('div');
				cardOptions.classList.add('card__options');
				card.append(cardOptions);
				
				for (let op of Object.keys(questionsJson[q].options)) {
					const option = document.createElement('div');
					option.innerHTML = `${questionsJson[q].options[op]}`;
					option.classList.add('option');
					option.dataset.id = op;
					option.addEventListener('click', checkAnswer);
					cardOptions.append(option);
				}

			} else { scoreboard() };
		};

		function checkAnswer(e: Event) {	
				if (Number(e.target.dataset.id) === questionsJson[currentQuestion].answer) {
					score++;
				};
				const cardElement = e.target.parentNode;
				for (let opElement of cardElement.children) {						
					opElement.style.color = 'var(--primary-color)';
					if (Number(opElement.dataset.id) === questionsJson[currentQuestion].answer) {
					opElement.style.backgroundColor = 'var(--correct-answer)';
					} else {
						opElement.style.backgroundColor = 'var(--wrong-answer)';
					};
				};
				currentQuestion++;
				setTimeout(() => loadQuestion(currentQuestion), 1000);
			// COMO REMOVER OS EVENTOS??
		};

		function cleanCard() {
			card.innerHTML = ''
		};

		function scoreboard() {
			cleanCard();

			const scoreboardElement = document.createElement('div');
			scoreboardElement.classList.add('card__score');
			scoreboardElement.innerHTML = `<span class="score">${score}</span>/<span>${totalOfQuestions}</span>`;
			
			card.innerHTML = `
				<h1>
		      <img src=${footballIcon} alt="football icon" />
		      FutQuiz
		    </h1>
		    <p style="font-size: 1.5rem;">Você acertou<p>
	    `
			card.append(scoreboardElement);
		};

		loadQuestion(currentQuestion);

	e.target.removeEventListener('click', init);
};
