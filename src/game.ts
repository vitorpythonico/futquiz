import questions from './data/questions.json';
import footballIcon from './assets/football-icon.png';

export default function init(e: Event) {
	const card = document.querySelector('.card');
	const questionsArray =  Object.keys(questions);
	let totalOfQuestions = questionsArray.length;
	let currentQuestion = questionsArray[0];
	let score = 0;
	let timer;
	let currentTime;
	const time = 5000 // 5 seconds

	card.innerHTML = `
    <h1>
      <img src=${footballIcon} alt="football icon" />
      FutQuiz
    </h1>
	`;

		function loadQuestion(q: number) {
			if (currentQuestion <= totalOfQuestions) {
				cleanCard();
				const currentQuestionElement = document.createElement('p');
				currentQuestionElement.innerHTML = `<span id="current_question">${currentQuestion}</span>/<span>${totalOfQuestions}</span>`;
				currentQuestionElement.style.color = 'var(--primary-color)';
				card.prepend(currentQuestionElement);

				const description = document.createElement('div');
		    description.innerHTML = `<span>${questions[q].description}</span>`;
		    description.classList.add('card__description');
		    card.append(description);

				const cardOptions = document.createElement('div');
				cardOptions.classList.add('card__options');
				card.append(cardOptions);
				
				for (let op of Object.keys(questions[q].options)) {
					const option = document.createElement('div');
					option.innerHTML = `${questions[q].options[op]}`;
					option.classList.add('option');
					option.dataset.id = op;
					option.addEventListener('click', checkAnswer);
					cardOptions.append(option);
				}
				const timerElement = document.createElement('div');
				timerElement.classList.add('card__timer');
				card.prepend(timerElement);

				currentTime = time;
				timerElement.style.width = '100%';
				timer = setInterval(() => {handleTimer(timerElement)}, 50);

			} else { scoreboard() };
		};

		function checkAnswer(e: Event) {
				clearInterval(timer);
				if (Number(e.target.dataset.id) === questions[currentQuestion].answer) {
					score++;
				};
				showAnswer(e);
				currentQuestion++;
				setTimeout(() => loadQuestion(currentQuestion), 1000);
			// COMO REMOVER OS EVENTOS??
		};

		function showAnswer(e: HTMLDivElement | null) {
			let cardElement;
			if (e) {
				cardElement = e.target.parentNode;
			} else {
				cardElement = document.querySelector('.card__options');
			}

			for (let opElement of cardElement.children) {
				opElement.style.color = 'var(--primary-color)';
				if (Number(opElement.dataset.id) === questions[currentQuestion].answer) {
				opElement.style.backgroundColor = 'var(--correct-answer)';
				} else {
					opElement.style.backgroundColor = 'var(--wrong-answer)';
				};
			};
		}


		function cleanCard() {
			card.innerHTML = ''
		};

		function handleTimer(timerElement: HTMLDivElement) {
			if (currentTime <= 0) {
				showAnswer();
				currentQuestion++;
				setTimeout(() => loadQuestion(currentQuestion), 1500);
				clearInterval(timer);
			} else {
				timerElement.style.width = `${(currentTime*100) / time}%`;
				currentTime -= 50;
			}
		}

		function scoreboard() {
			cleanCard();

			const scoreboardElement = document.createElement('div');
			scoreboardElement.classList.add('card__score');
			scoreboardElement.innerHTML = `<span class="score">${score}</span>/<span>${totalOfQuestions}</span>`;
			
			const restartBtnElement = document.createElement('button');
			restartBtnElement.innerText = 'Reiniciar';
			restartBtnElement.addEventListener('click', init);

			card.innerHTML = `
				<h1>
		      <img src=${footballIcon} alt="football icon" />
		      FutQuiz
		    </h1>
		    <p id="scoreboard_message">Você acertou<p>
	    `
			card.append(scoreboardElement);
			card.append(restartBtnElement);
		};

		loadQuestion(currentQuestion);

	e.target.removeEventListener('click', init);
};
