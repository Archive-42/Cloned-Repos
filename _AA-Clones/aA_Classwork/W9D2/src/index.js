const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");
const GameView = require("./game_view.js");
const Game = require("./game.js");

console.log("Webpack is working!");

window.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('game-canvas');
  const context = canvas.getContext('2d');
  const game = new Game();
  new GameView(game, context).start();
})

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;