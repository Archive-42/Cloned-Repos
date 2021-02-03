const Game = require("./game.js");

function GameView(game, context) {
  this.game = game;
  this.context = context;
}

GameView.prototype.start = function() {
  // let that = this;
  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.context);
  }, 20)
  // setInterval(this.moveObjects(), 20);
  // debugger
  // setInterval(this.draw(this.context), 20);
};

module.exports = GameView;