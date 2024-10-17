import { INITIAL_TRIES, WORD_KEY, WORDS } from './consts.ts';
import { createPlaceholdersSection } from './placeholders.ts';
import { createKeyboard, handleKeyboardClick } from './keyboard.ts';
import { createHangmanImg, updateHangmanImage } from './hangman.ts';

enum GameStatus {
  WIN = 'win',
  LOSE = 'lose',
  QUIT = 'quit',
}

const gameContainer = document.getElementById('game') as HTMLDivElement;
const logoElement = document.getElementById('logo');

let triesLeft: number;
let winCount: number;

const updateTriesDisplay = (): void => {
  const triesCounter = document.getElementById('tries-left');
  if (triesCounter) triesCounter.innerText = String(triesLeft);
};

const checkLetter = (letter: string): void => {
  const word = sessionStorage.getItem(WORD_KEY);
  const inputLetter = letter.toLowerCase();

  if (!word?.includes(inputLetter)) {
    triesLeft -= 1;
    updateTriesDisplay();
    updateHangmanImage(triesLeft);

    if (triesLeft === 0) stopGame(GameStatus.LOSE);
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (inputLetter === currentLetter) {
        winCount += 1;
        const letterElement = document.getElementById(`letter_${i}`);
        if (letterElement) letterElement.innerText = inputLetter.toUpperCase();
        if (winCount === word.length) stopGame(GameStatus.WIN);
      }
    });
  }
};

export const startGame = (): void => {
  triesLeft = INITIAL_TRIES;
  winCount = 0;

  logoElement?.classList.add('logo-sm');

  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem(WORD_KEY, wordToGuess);

  gameContainer.innerHTML = createPlaceholdersSection(wordToGuess);
  gameContainer.innerHTML += `
    <p id='tries'>TRIES LEFT: <span id='tries-left'>${INITIAL_TRIES}</span></p>
  `;

  const keyboardSection = createKeyboard();
  keyboardSection.addEventListener('click', (evt) =>
    handleKeyboardClick(evt, checkLetter)
  );
  gameContainer.appendChild(keyboardSection);

  const hangmanImg = createHangmanImg();
  gameContainer.prepend(hangmanImg);

  gameContainer.insertAdjacentHTML(
    'beforeend',
    '<button id="quit" class="button-secondary quit-button">Quit</button>'
  );

  const quitButton = document.getElementById('quit');
  if (quitButton) {
    quitButton.onclick = () => {
      const isSure = confirm(
        'Are you sure you want to quit and lose progress?'
      );
      if (isSure) {
        stopGame(GameStatus.QUIT);
      }
    };
  }
};

const stopGame = (status: GameStatus): void => {
  document.getElementById('placeholders')?.remove();
  document.getElementById('tries')?.remove();
  document.getElementById('keyboard')?.remove();
  document.getElementById('quit')?.remove();

  const word = sessionStorage.getItem(WORD_KEY);
  const hangmanImg = document.getElementById('hangman-img') as HTMLImageElement;

  switch (status) {
    case GameStatus.WIN:
      {
        if (hangmanImg) hangmanImg.src = 'images/hg-win.png';
        gameContainer.innerHTML +=
          '<h2 class="result_header win">You won!</h2>';
      }
      break;
    case GameStatus.LOSE:
      {
        gameContainer.innerHTML +=
          '<h2 class="result_header lose">You lost :(</h2>';
      }
      break;
    case GameStatus.QUIT: {
      logoElement?.classList.remove('logo-sm');
      hangmanImg.remove();
    }
  }

  gameContainer.innerHTML += `
    <p class='mt-5'>
      The word was: <span class='result-word'>${word?.toUpperCase()}</span>
    </p>
    <button id='play-again' class='button-primary button-again'>Play Again</button>
  `;

  const againGameButton = document.getElementById('play-again');
  if (againGameButton) againGameButton.onclick = startGame;
};
