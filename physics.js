let bird, floor;
let flapMidImg, bg;

function preload() {
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');
}

function setup() {
  new Canvas(400, 600);
  world.gravity.y = 10;

  // Floor for bounce
  floor = new Sprite(200, height - 20, 400, 125, 'static' );
  floor.img = base;

  // Bird with full physics
  bird = new Sprite(width / 2, 200, 30, 30, 'dynamic');
  bird.img = flapMidImg;
  bird.mass = 2;         // heavier = stronger pull from gravity
  bird.drag = 0.02;      // air resistance
  bird.bounciness = 0.5; // how much it bounces when hitting floor
}

function draw() {
  image(bg, 0, 0, width, height);

  // Apply upward push when space is pressed
  if (kb.presses('space')) {
    bird.vel.y = -15;
    bird.sleeping = false; // wake up if sleeping
  }

  if(mouse.presses()){
    new Sprite(mouse.x, 200, 30, 30, 'dynamic');
  }

  // Debug info (optional)
  fill("blue");
  textSize(14);
  text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
  text('isMoving: ' + bird.isMoving, 10, 40);
  text('sleeping: ' + bird.sleeping , 10, 60);
}
 