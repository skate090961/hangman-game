import { KEYBOARD_LETTERS, WORDS } from './consts.ts';

enum GameStatus {
  WIN = 'win',
  LOSE = 'lose',
  QUIT = 'quit',
}

const gameContainer = document.getElementById('game') as HTMLDivElement;
const logoElement = document.getElementById('logo');
const WORD_KEY = 'word';

let triesLeft: number;
let winCount: number;

const createPlaceholdersHTML = (word: string): string => {
  return Array.from(word)
    .map((_, i) => `<span id='letter_${i}' class='letter'> _ </span>`)
    .join('');
};

const createPlaceholdersSection = (): string => {
  const word = sessionStorage.getItem(WORD_KEY);
  if (!word) return '';

  return `<section id='placeholders' class='placeholders_container'>${createPlaceholdersHTML(word)}</section>`;
};

const createKeyboardButton = (letter: string): string =>
  `<button class='button-primary keyboard-button' id='${letter}'>${letter}</button>`;

const createKeyboard = (): HTMLElement => {
  const keyboard = document.createElement('section');
  keyboard.classList.add('keyboard');
  keyboard.id = 'keyboard';

  keyboard.innerHTML = KEYBOARD_LETTERS.map(createKeyboardButton).join('');

  return keyboard;
};

const checkLetter = (letter: string): void => {
  const word = sessionStorage.getItem(WORD_KEY);
  const inputLetter = letter.toLowerCase();
  if (!word?.includes(inputLetter)) {
    const triesCounter = document.getElementById('tries-left');
    triesLeft -= 1;
    if (triesCounter) triesCounter.innerText = String(triesLeft);
    const hangmanImg = document.getElementById(
      'hangman-img'
    ) as HTMLImageElement;
    if (hangmanImg) hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) stopGame(GameStatus.LOSE);
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (inputLetter === currentLetter) {
        winCount += 1;
        if (winCount === word.length) stopGame(GameStatus.WIN);
        const letter = document.getElementById(`letter_${i}`);
        if (letter) letter.innerText = inputLetter.toUpperCase();
      }
    });
  }
};

const handleKeyboardClick = (event: MouseEvent): void => {
  const targetButton = event.target as HTMLButtonElement;
  if (targetButton && targetButton.tagName.toLowerCase() === 'button') {
    targetButton.disabled = true;
    checkLetter(targetButton.id);
  }
};

const createHangmanImg = (): HTMLImageElement => {
  const image = document.createElement('img');
  image.src = 'images/hg-0.png';
  image.alt = 'hangman image';
  image.id = 'hangman-img';
  image.classList.add('hangman-img');

  return image;
};

export const startGame = (): void => {
  triesLeft = 10;
  winCount = 0;

  logoElement?.classList.add('logo-sm');

  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];

  sessionStorage.setItem(WORD_KEY, wordToGuess);

  gameContainer.innerHTML = createPlaceholdersSection();
  gameContainer.innerHTML += `<p id='tries'>TRIES LEFT: <span id='tries-left'>10</span></p>`;

  const keyboardSection = createKeyboard();
  keyboardSection.addEventListener('click', handleKeyboardClick);
  gameContainer.appendChild(keyboardSection);

  const hangmanImg = createHangmanImg();
  gameContainer.prepend(hangmanImg);

  gameContainer.insertAdjacentHTML(
    'beforeend',
    '<button id="quit" class="button-secondary quit-button">Quit</button>'
  );

  const quitButton = document.getElementById('quit');
  if (quitButton)
    quitButton.onclick = () => {
      const isSure = confirm(
        'Are you sure you want to quit and lose progress?'
      );
      if (isSure) {
        stopGame(GameStatus.QUIT);
      }
    };
};

const stopGame = (status: GameStatus) => {
  document.getElementById('placeholders')?.remove();
  document.getElementById('tries')?.remove();
  document.getElementById('keyboard')?.remove();
  document.getElementById('quit')?.remove();

  const word = sessionStorage.getItem(WORD_KEY);
  const hangmanImg = document.getElementById('hangman-img') as HTMLImageElement;

  if (status === GameStatus.WIN) {
    if (hangmanImg) hangmanImg.src = 'images/hg-win.png';
    if (gameContainer)
      gameContainer.innerHTML += '<h2 class="result_header win">You won!</h2>';
  } else if (status === GameStatus.LOSE) {
    if (gameContainer)
      gameContainer.innerHTML +=
        '<h2 class="result_header lose">You lost :(</h2>';
  } else if (status === GameStatus.QUIT) {
    logoElement?.classList.remove('logo-sm');
    hangmanImg.remove();
  }

  gameContainer.innerHTML += `<p class='mt-5'>The word was: <span class='result-word'>${word?.toUpperCase()}</span></p><button id='play-again' class='button-primary button-again'>Play Again</button>`;

  const againGameButton = document.getElementById('play-again');
  if (againGameButton) againGameButton.onclick = startGame;
};
