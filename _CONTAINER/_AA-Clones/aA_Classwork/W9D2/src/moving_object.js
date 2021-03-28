function MovingObject(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}


MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  // debugger;
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  // if (this.pos[0] < 0 || this.pos[0] > this.game.DIM_X) {
  //   this.pos[0] = this.game.wrap(this.pos[0], this.game.DIM_X);
  // } else if (this.pos[1] < 0 || this.pos[1] > this.game.Game.DIM_Y) {
  //   this.pos[1] = this.game.wrap(this.pos[1], this.game.Game.DIM_Y);
  // }
};

module.exports = MovingObject;