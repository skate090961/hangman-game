import '../css/style.css'
import {darkModeHandle} from "./utils.ts";
import {startGame} from "./game.ts";

darkModeHandle();

const startGameButton = document.getElementById('startGame');

startGameButton?.addEventListener('click', startGame)