import {KEYBOARD_LETTERS, WORDS} from "./consts.ts";

const gameContainer = document.getElementById('game') as HTMLDivElement;
const WORD_KEY = 'word';

const createPlaceholdersHTML = (word: string): string => {

    return Array.from(word)
        .map((_, i) => `<span id="letter_${i}" class="letter"> _ </span>`)
        .join('');
};

const createPlaceholdersSection = (): string => {
    const word = sessionStorage.getItem(WORD_KEY);
    if (!word) return '';

    return `<section id="placeholders" class="placeholders_container">${createPlaceholdersHTML(word)}</section>`;
};

const createKeyboardButton = (letter: string): string =>
    `<button class="button-primary keyboard-button" id="${letter}">${letter}</button>`;

const createKeyboard = (): HTMLElement => {
    const keyboard = document.createElement('section');
    keyboard.classList.add('keyboard');
    keyboard.id = 'keyboard';

    keyboard.innerHTML = KEYBOARD_LETTERS
        .map(createKeyboardButton)
        .join('');

    return keyboard;
};

const handleKeyboardClick = (event: MouseEvent): void => {
    const targetButton = event.target as HTMLButtonElement;
    if (targetButton && targetButton.tagName === 'BUTTON') {
        console.log(targetButton.id);
    }
};

export const startGame = (): void => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const wordToGuess = WORDS[randomIndex];
    sessionStorage.setItem(WORD_KEY, wordToGuess);

    gameContainer.innerHTML = createPlaceholdersSection();
    const keyboardContainer = createKeyboard();
    keyboardContainer.addEventListener('click', handleKeyboardClick);

    gameContainer.appendChild(keyboardContainer);
};