function setup() {
  // Art Canvas(width, height) - You should always set this, but if you don't, p5 will provide one
  //  for you! Renders in pixels. Creates a canvas element in the document, and sets the dimensions
  //  of it in pixels.This method should be called only once at the start of setup.
  createCanvas(500, 500);

  // Basically a console.log
  print("setup");
}

function draw() {
  // Background Color - RGB
  background(0);

  // Fill(rgb) - shape color
  fill(255, 50, 0);

  // Sets the rectangle's x and y as the center of rectangle, by default it does top-left
  rectMode(CENTER);

  // Rectangle(x, y, width, height[, rounded corners]) - The fifth, sixth, seventh and eighth parameters, if specified, determine corner radius for the top-left, top-right, lower-right and lower-left corners, respectively. An omitted corner radius parameter is set to the value of the previously specified radius value in the parameter list. rect(x, y, w, [h], [tl], [tr], [br], [bl]) || rect(x, y, w, h, [detailX], [detailY])
  rect(250, 250, 50, 50, 10, 10, 5, 5);

  // Ellipse(x, y, width, height)
  fill(255, 100, 50);
  stroke(255, 50, 0);
  ellipse(250, 250, 50, 50);

  // Line(x1, y1, [z1], x2, y2, [z2])
  stroke(255);
  line(0, 0, 499, 499);
  line(499, 0, 0, 499);

  // NOTE: Each shape layers on top of one another as you go down the code!!

  // frameCount - A browser variable which shows the amount of frames passed through
  // print(frameCount);
}
