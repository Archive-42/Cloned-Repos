function setup() {
    // Basically console.log
    print("Initializing Canvas...");

    // createCanvas(width, height)
    createCanvas(500, 500);

    // background(R, G, B) (Color range for each - o to 255)
    // NOTE: When R === G === B, this is known as grayscale color
    // background(#) - If you use one number, it's simply grayscale
    background(100);
}

function draw() {
    // arc(x, y, w, h, start, stop, [mode], [detail])
    fill(255, 255, 0);
    arc(250, 250, 100, 100, 100, 250, PIE);

    fill(0);
    ellipse(235, 225, 10, 10);

    // circle(x, y, d)
    circle(100, 100, 25);

    // point(x, y, [z])
    strokeWeight(10);
    point(300, 300);

    // quad(x1, y1, [z1,] x2, y2, [z2,] x3, y3, [z3,] x4, y4, [z4])
    // quad(100, 300, 50, 50, 250, 250, 450, 400);

    // square(x, y, s, [tl], [tr], [br], [bl])
    // s = size of square
    square(450, 450, 20);

    // triangle(x1, y1, x2, y2, x3, y3)
    triangle(20, 20, 40, 40, 20, 60);
}
