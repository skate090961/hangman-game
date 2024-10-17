const createPlaceholdersHTML = (word: string): string =>
  Array.from(word)
    .map((_, i) => `<span id='letter_${i}' class='letter'> _ </span>`)
    .join('');

export const createPlaceholdersSection = (word: string): string => {
  return word
    ? `<section id='placeholders' class='placeholders_container'>${createPlaceholdersHTML(word)}</section>`
    : '';
};
