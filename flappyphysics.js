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


}
 