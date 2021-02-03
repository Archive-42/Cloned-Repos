let circleX = 0;
let circleY = 499;

function setup() {
    print("Initializing Canvas...");
    createCanvas(500, 500);
    background(0);
}

function draw() {
    const smallSquare = (x, y, color = [255]) => {
        fill(...color);
        return square(mouseX + x, y, 20);
    };
    const largeSquare = (x, y, color = [255]) => {
        fill(...color);
        return square(x, y, 100);
    };

    fill(255);
    smallSquare(circleX++, circleY--, [50, 50, 100]);
    largeSquare(100, circleY, [150, 150, 100]);
}
