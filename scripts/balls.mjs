import Game from './Game.mjs'

function main() {
    let gameCanvas = document.getElementById("gameCanvas");
    let game = new Game(gameCanvas);
    game.start();
}

main();