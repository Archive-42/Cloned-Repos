var Circle = function (diameter) {
    this.diameter = diameter;
};

Circle.prototype.getRadius = function () {
  return this.diameter / 2;
};

module.exports = Circle;