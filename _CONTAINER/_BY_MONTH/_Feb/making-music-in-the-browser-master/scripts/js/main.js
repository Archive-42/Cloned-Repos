let context = new AudioContext() || new webkitAudioContext();
let gainNode = context.createGain();
let circle = document.querySelector('#circle');
let mousedown = false;
let oscillator = null;

gainNode.connect(context.destination);

let calculateFrequency = function (mouseXPosition) {
  let minFrequency = 20;
  let maxFrequency = 2000;

  return (mouseXPosition / window.innerWidth) * maxFrequency + minFrequency;
};

let calculateGain = function (mouseYPosition) {
  let minGain = 0;
  let maxGain = 1;

  return 1 - (mouseYPosition / window.innerHeight) * maxGain + minGain;
};

let drawCircle = function (x, y) {
  circle.style.background = '#f2ed63';
  circle.style.display = 'block';
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
  circle.style.position = 'absolute';
  circle.style.width = '10px';
  circle.style.height = '10px';
  circle.style.borderRadius = '50%';
};

let createOscillator = function (e) {
  let xPos = e.clientX;
  let yPos = e.clientY;

  if (e.touches) {
    xPos = e.touches[0].clientX;
    yPos = e.touches[0].clientY;
  }

  mousedown = true;

  drawCircle(xPos, yPos);
  oscillator = context.createOscillator();
  oscillator.frequency.setTargetAtTime(
    calculateFrequency(xPos),
    context.currentTime,
    0.001
  );
  gainNode.gain.setTargetAtTime(
    calculateGain(yPos),
    context.currentTime,
    0.001
  );
  oscillator.connect(gainNode);
  oscillator.start(context.currentTime);
};

let stopOscillator = function () {
  mousedown = false;

  if (oscillator) {
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
  }
};

let changeFrequency = function (e) {
  let xPos = e.clientX;
  let yPos = e.clientY;

  if (e.touches) {
    xPos = e.touches[0].clientX;
    yPos = e.touches[0].clientY;
  }

  if (mousedown && oscillator) {
    oscillator.frequency.setTargetAtTime(
      calculateFrequency(xPos),
      context.currentTime,
      0.001
    );
    gainNode.gain.setTargetAtTime(
      calculateGain(yPos),
      context.currentTime,
      0.001
    );

    drawCircle(xPos, yPos);
  }
};

document.body.addEventListener('mousedown', function (e) {
  createOscillator(e);
});

document.body.addEventListener('touchstart', function (e) {
  createOscillator(e);
});

document.body.addEventListener('mouseup', function () {
  stopOscillator();
});

document.body.addEventListener('touchend', function () {
  stopOscillator();
});

document.body.addEventListener('mousemove', function (e) {
  changeFrequency(e);
});

document.body.addEventListener('touchmove', function (e) {
  changeFrequency(e);
});
