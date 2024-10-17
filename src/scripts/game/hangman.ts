import { INITIAL_TRIES } from './consts.ts';

export const createHangmanImg = (): HTMLImageElement => {
  const image = document.createElement('img');
  image.src = 'images/hg-0.png';
  image.alt = 'hangman image';
  image.id = 'hangman-img';
  image.classList.add('hangman-img');
  return image;
};

export const updateHangmanImg = (triesLeft: number): void => {
  const hangmanImg = document.getElementById('hangman-img') as HTMLImageElement;
  if (hangmanImg) hangmanImg.src = `images/hg-${INITIAL_TRIES - triesLeft}.png`;
};
