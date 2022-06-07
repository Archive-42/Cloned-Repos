// let color = 0;

// function setup() {
//     createCanvas(600, 400);
// }

// function draw() {
//     // map - will map one range (0, 600) to another range (0, 255)
//     //  - syntax: map(variable, min, max, min, max)
//     color = map(mouseX, 0, 600, 0, 255);
//     background(random(50, 155), random(0, 50), random(0, 10));

//     fill(250, 118, 222);
//     ellipse(mouseX, 200, 64, 64);
// }


let pt = {
    x: 100,
    y: 50
};

let color = {
    r: 255,
    g: 255,
    b: 255
};


function setup() {
    createCanvas(600, 400);
    background(0);
}

function draw() {
    pt.x = random(0, width);
    pt.y = random(0, height);
    fill(random(0, color.r), random(0, color.g), random(0, color.b), random(0, 255));
    ellipse(pt.x, pt.y, random(0, 100), random(0, 100));
}

function mousePressed() {
    background(0);
}
