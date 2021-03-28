var Square = function (l) {
    this.length = l;
};

Square.prototype.perimeter = function () {
    return this.length * 4;
};

var Rectangle = function () {};

module.exports = Square;