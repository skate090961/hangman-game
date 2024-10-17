import '../css/style.css';
import { darkModeHandle } from './darkMode/darkMode.ts';
import { startGame } from './game/game.ts';

darkModeHandle();

const startGameButton = document.getElementById('startGame');

startGameButton?.addEventListener('click', startGame);
