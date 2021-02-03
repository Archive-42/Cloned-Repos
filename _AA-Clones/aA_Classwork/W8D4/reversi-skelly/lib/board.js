let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  const grid = [...Array(8)].map(e => Array(8));
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[4][4] = new Piece("white");
  grid[3][3] = new Piece("white");
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */

Board.prototype.isValidPos = function (pos) {
  let row = pos[0];
  let col = pos[1];
  if ((0 > row) || (row > 7)) {
    return false;
  }
  if ((0 > col) || (col > 7)) {
    return false;
  }

  return true;
}

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  // [3,4]
  let row = pos[0];
  let col = pos[1];
  if (this.isValidPos(pos)) {
    return this.grid[row][col];
  }
  throw new Error("Not valid pos!");
};

/**
 * Checks if there are any valid moves for the given color.
 */

Board.prototype.hasMove = function (color) {

    // for (let i = 0; i < this.grid.length; i++) {
    //   for (let j = 0; j < this.grid.length; j++) {
    //     if ((this.getPiece[i,j] instanceof Piece ) && this.getPiece[i,j].color === color ) {
    //       this.DIRS.forEach(function(dir){
    //         let newPos = [i+dir[0], j+dir[1]]
    //         if (newPos) {

    //         }
    //       })
    //     }
    //   }

    // }

};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos) && (this.getPiece(pos).color === color)) {

      return true;
    
  }
  return false;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if(this.getPiece(pos)){
    return true;
  }
  return false;
}
/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};



/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir) {
  let nextPos = [pos[0] + dir[0], pos[1] + dir[1]]
  let piecesToFlip = []
  
  while (board.isValidPos(nextPos)) {
    if (board.isMine(nextPos, color)) {
      piecesToFlip = [];
    }

    if (board.isOccupied(nextPos)) {
      piecesToFlip.push(board[nextPos]);
    }
    else {
        return piecesToFlip;
    }

    nextPos = [pos[0] + dir[0], pos[1] + dir[1]]
  }
  return null;
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }
  Board.DIRS.forEach(function(dir) {
    if (_positionsToFlip(this, pos, color, dir) != null) {
      return true;
    }
  }) 
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

module.exports = Board;
