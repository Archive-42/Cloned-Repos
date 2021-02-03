const Asteroid = require('./asteroid.js');

function Game(options) {
  // this.asteroids = [];
  // debugger;
  this.addAsteroids();
  this.DIM_X = 1000;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 50;
  this.BG_COLOR = "#0c0c0c";
}
const asteroids = [];


Game.prototype.addAsteroids = function() {
  // debugger;
  let i = this.NUM_ASTEROIDS;

  while (i > 0) {
    // debugger;
    asteroids.push(new Asteroid({pos: this.randomPosition()}));
    //Asteroids({pos: [x,y], game: this?})
    i--;
  }
  return asteroids;
};

Game.prototype.randomPosition = function() {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];

};

Game.prototype.draw = function(context) {
  // debugger
  context.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  context.fillStyle = this.BG_COLOR;
  context.fillRect(0, 0, this.DIM_X, this.DIM_Y);
  asteroids.forEach((asteroid) => asteroid.draw(context));
}

Game.prototype.moveObjects = function() {
  asteroids.forEach(asteroid => asteroid.move());
}

// Game.prototype.wrap = function(coord, max) {
//   if (coord < 0) {
//     return max - (coord % max);
//   } else if (coord > max) {
//     return coord % max;
//   } else {
//     return coord;
//   }
// }

module.exports = Game;