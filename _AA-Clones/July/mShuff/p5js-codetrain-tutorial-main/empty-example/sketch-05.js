let x = 0;
let y = 200;
let diameter = 50;
let r = 218;
let g = 160;
let b = 221;

let circle = {
    x: 0,
    y: 100,
    diameter: 50
};

function setup() {
    print("Initializing Canvas...");
    createCanvas(600, 400);
}

function draw() {
    background(r, g, b);

    fill(250, 200, 200);
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);

    circle.x++;
}
