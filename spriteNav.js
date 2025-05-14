let bird;
let step = 0;

function preload(){
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  bg = loadImage('assets/background-day.png');
}

function setup() {
  new Canvas(400, 600); // based on the size of the background image used
  bird = new Sprite(width / 2, height / 2, 30, 30, 'static'); // start at center
  bird.img = flapMidImg;
  bird.rotation = 0;
  frameRate(10); // slow down frameCount
}

function draw() {
  background = image(bg, 0, 0, width, height); // background image
  // Move in a square pattern: right → down → left → up
  if (step < 10) {
    bird.x += 10; // right
    bird.rotation = 0;
  } else if (step < 20) {
    bird.y += 10; // down
    bird.rotation = 90;
  } else if (step < 30) {
    bird.x -= 10; // left
    bird.rotation = 180;
  } else if (step < 40) {
    bird.y -= 10; // up
    bird.rotation = 270;
  }

  step++;
  if (step >= 40) {
    step = 0; // loop the square path
  }

  if (frameCount%60==0){ // usually 1 sec but in this case 10 frames is 1 sec
    noLoop();
  }
}
