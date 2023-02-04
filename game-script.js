// Main assignment

const ROCK_PAPER_SCISSORS = ['Rock', 'Paper', 'Scissors'];

const score = {
  player: 0,
  computer: 0,
};

const paperElementTemplate = `<div class="information__illustrations--image information__illustrations--paper">
<img src="./images/paper.png" alt="paper">
</div>`;

const scissorsElementTemplate = `<div class="information__illustrations--image information__illustrations--scissors">
<img src="./images/scissors.png" alt="scissors">
</div>`;

const rockElementTemplate = `<div class="information__illustrations--image information__illustrations--rock">
<img src="./images/rock.png" alt="rock">
</div>`;

const computerChoiceTemplate = {
  Rock: rockElementTemplate,
  Paper: paperElementTemplate,
  Scissors: scissorsElementTemplate,
};

const restartButton = document.querySelector('.restart__button');
const resultTextElement = document.querySelector('.result__text');
const computerChoiceElement = document.querySelector(
  '.information__illustrations--computerchoice'
);

const playerChoicesMainElement = document.querySelector(
  '.information__illustrations'
);
const playerChoicesElementsArray = document.querySelectorAll(
  '.information__illustrations--choice'
);

const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

const computerPlay = () => {
  let computerChoice = getRandomArrayElement(ROCK_PAPER_SCISSORS);
  computerChoiceElement.innerHTML = computerChoiceTemplate[computerChoice];
  return computerChoice;
};

const highlightPlayerChoice = (chosenElement) => {
  playerChoicesElementsArray.forEach((item) =>
    item.classList.remove('information__illustrations--chosen')
  );
  chosenElement.classList.add('information__illustrations--chosen');
};

const playerMakeChoice = (choice) => {
  highlightPlayerChoice(choice.parentElement);
  return choice.parentElement.dataset.choice;
};

const restartGame = () => {
  score.computer = 0;
  score.player = 0;
  resultTextElement.innerHTML = 'New Game! Score has been refreshed.';
  playerChoicesElementsArray.forEach((item) =>
    item.classList.remove('information__illustrations--chosen')
  );
  computerChoiceElement.innerHTML = `<div class="information__illustrations--image"></div>`;
};

const playerWins = () => {
  score.player += 1;
  return `Player Wins! Score is: Player: ${score.player}, Computer: ${score.computer}`;
};

const computerWins = () => {
  score.computer += 1;
  return `Computer Wins :( Score is: Player: ${score.player}, Computer: ${score.computer}`;
};

const playRockPaperScissors = (playerSelection, computerSelection) => {
  let message = '';
  if (playerSelection === computerSelection) {
    message = `DRAW! Score is: Player: ${score.player}, Computer: ${score.computer}`;
  } else {
    if (playerSelection === 'Rock') {
      if (computerSelection === 'Paper') {
        message = computerWins();
      }
      if (computerSelection === 'Scissors') {
        message = playerWins();
      }
    }
    if (playerSelection === 'Scissors') {
      if (computerSelection === 'Rock') {
        message = computerWins();
      }
      if (computerSelection === 'Paper') {
        message = playerWins();
      }
    }
    if (playerSelection === 'Paper') {
      if (computerSelection === 'Rock') {
        message = playerWins();
      }
      if (computerSelection === 'Scissors') {
        message = computerWins();
      }
    }
  }
  resultTextElement.innerHTML = message;
};

playerChoicesMainElement.addEventListener('click', (evt) => {
  const playerChoice = playerMakeChoice(evt.target);
  if (playerChoice === undefined) {
    return;
  }
  const computerChoice = computerPlay();
  playRockPaperScissors(playerChoice, computerChoice);
});

restartButton.addEventListener('click', restartGame);
