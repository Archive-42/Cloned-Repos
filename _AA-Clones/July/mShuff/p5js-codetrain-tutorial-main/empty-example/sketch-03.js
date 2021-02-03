// Setup only runs ONCE
function setup() {
    print("Initializing Canvas...");

    createCanvas(500, 500);
    background(0);
}

function draw() {

    background(mouseX, mouseY, Math.random(mouseX * mouseY) * 100);
    // NOTE: Color adjustments:
    //  - background(Red, Green, Blue, Alpha): background of canvas, defaults to white
    //      - If given one argument, it will do grayscale
    //      - If given three arguments, it will do RGB at full transparency
    //      - If given four arguments, it will interpret transparency from Alpha parameter(0-255)
    //      - Alpha = Transparency
    //  - fill(Red, Green, Blue, Alpha):       what shapes are filled with, defaults to white
    //  - stroke(Red, Green, Blue, Alpha):     outline/stroke color of shape, defaults to black
    //  - noStroke():                          removes all stroke from object
    //  - noFill():                            removes all fill color from object
    //  - strokeWeight(#):                     defines stroke size in pixels
    const smallSquare = (x, y, color = [255]) => {
        fill(...color);
        return square(mouseX + x, y, 20);
    };
    const largeSquare = (x, y, color = [255]) => {
        fill(...color);
        return square(x, y, 100);
    };

    fill(255);
    smallSquare(10, 10, [50, 50, 100]);
    largeSquare(100, 100, [150, 150, 100]);
    largeSquare(100, 200);

    // mouseX - The mouse's X coordinate
    // mouseY - The mouse's Y coordinate
    circle(mouseX, mouseY, 50);
}


function mousePressed() {
    background(mouseX, mouseY, Math.random(mouseX * mouseY) * 100);
}
