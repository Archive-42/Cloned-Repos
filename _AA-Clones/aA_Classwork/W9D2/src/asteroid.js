const MovingObject = require("./moving_object.js");
const Util = require("./util.js");


function Asteroid(options) {
  // debugger;
  MovingObject.call(this, {
    pos: options.pos,
    vel: Util.randomVec(5),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
    game: options.game
  });
}

Asteroid.COLOR = '#d3d3d3';
Asteroid.RADIUS = 20;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;