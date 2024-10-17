import { KEYBOARD_LETTERS } from './consts.ts';

const createKeyboardButton = (letter: string): string =>
  `<button class='button-primary keyboard-button' id='${letter}'>${letter}</button>`;

export const createKeyboard = (): HTMLElement => {
  const keyboard = document.createElement('section');
  keyboard.classList.add('keyboard');
  keyboard.id = 'keyboard';
  keyboard.innerHTML = KEYBOARD_LETTERS.map(createKeyboardButton).join('');
  return keyboard;
};

export const handleKeyboardClick = (
  event: MouseEvent,
  checkLetter: (letter: string) => void
): void => {
  const targetButton = event.target as HTMLButtonElement;
  if (targetButton && targetButton.tagName.toLowerCase() === 'button') {
    targetButton.disabled = true;
    checkLetter(targetButton.id);
  }
};
