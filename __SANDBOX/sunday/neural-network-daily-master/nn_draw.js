/*
 * NN game image version
 */
let img; 
let pg;
let count = 0;
let stepText;
let button;
let round = 0;
let check1;
let check2;
let check3;
let check4;

function preload(){
  	img = loadImage("data/elephant.jpg");
  	stepText = "STEP 1. \nInput node: Draw an outline of a feature on the image in 30 pixels"
}

function setup() {

 	createCanvas(2500, 1000);
 	image(img, 20, 40, 600, 400);

 	noFill();
 	stroke(200);
 	let rect1 = rect(20, 100+img.height, img.width, img.height);
 	let rect2 = rect(630, 100+img.height, img.width, img.height);
 	let rect3 = rect(1240, 100+img.height, img.width, img.height);
 	let rect4 = rect(1850, 100+img.height, img.width, img.height);

  	button = createButton('SEND');
  	button.position(660, 420);
  	button.size(100,40);
  	let col = color(207, 106, 135);
  	let textCol = color(255,255,255)
  	button.style('background-color', col);
  	button.style('color', textCol);
  	button.style('font-family', 'menlo');
  	button.style('font-size', '18px');
  	button.mousePressed(resetDraw);


  	check1 = createCheckbox(' Preview in canvas', false);
	check1.position(50, 1000);
	check1.style('font-family', 'menlo');
	check1.style('font-size', '18px');

	check2 = createCheckbox(' Preview in canvas', false);
	check2.position(660, 1000);
	check2.style('font-family', 'menlo');
	check2.style('font-size', '18px');

	check3 = createCheckbox(' Preview in canvas', false);
	check3.position(1270, 1000);
	check3.style('font-family', 'menlo');
	check3.style('font-size', '18px');

	check4 = createCheckbox(' Preview in canvas', false);
	check4.position(1880, 1000);
	check4.style('font-family', 'menlo');
	check4.style('font-size', '18px');

  

 // pg = createGraphics(1000,1000);
}

function mouseDragged() { 
 	
 	if (count<30 && mouseX<620 && mouseY<460) {
 		stroke(10, 250, 30); 
 		strokeWeight(4);
 		// noStroke();
 		line(mouseX, mouseY, pmouseX, pmouseY);

 		stroke(10, 10, 10); 
 		strokeWeight(4);
 		// noStroke();
 		line(mouseX + round*610, mouseY+60+img.height, pmouseX + round*610, pmouseY+60+img.height);

 		count++;
 	}
 	
}

function draw() {
	fill(196, 69, 105);
	noStroke();
	textSize(25);
  	textFont('menlo');
	text(stepText, 640, 280);


	let inputOne = get(20, 100+img.height, img.width, img.height);
	let inputTwo = get(630, 100+img.height, img.width, img.height);
	let inputThree = get(1240, 100+img.height, img.width, img.height);
	let inputFour = get(1850, 100+img.height, img.width, img.height);


	if(check1.checked())
		{
			image(inputOne, 20, 40);
		}
	if(check2.checked())
		{
			image(inputTwo, 20, 40);
		}

	if(check3.checked())
		{
			image(inputThree, 20, 40);
		}
	if(check4.checked())
		{
			image(inputFour, 20, 40);
		}
		
}


function resetDraw() {
	count = 0;
	if (round<3) {
		round++;
	}
	else {
		fill(256);
		rect(0,0,1300,40);	
		stepText = "STEP 2. \nHidden Node: Select TWO drawings from the canvases below to overlay";
		
		fill(250);
		rect(20,40,600,400);
		// image(inputTwo, 20, 40);


		


	}


}







