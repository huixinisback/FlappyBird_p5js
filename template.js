let bird;
let origin;
let flapMidImg, bg;

function preload() {
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  bg = loadImage('assets/background-day.png');
}

function setup() {
  new Canvas(400, 600);
  bird = new Sprite(width / 2, height / 2, 30, 30, 'static');
  bird.img = flapMidImg;
}

function draw() {
  image(bg, 0, 0, width, height); // draw background

}
