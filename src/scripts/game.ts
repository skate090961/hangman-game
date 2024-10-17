import { KEYBOARD_LETTERS, WORDS } from './consts.ts';

const gameContainer = document.getElementById('game') as HTMLDivElement;
const logoElement = document.getElementById('logo');
const WORD_KEY = 'word';

let triesLeft: number;

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
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (inputLetter === currentLetter) {
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
};
