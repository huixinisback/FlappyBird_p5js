let bird, floor;
let pipes;
let flapMidImg,flapDownImg, flapUpImg, pipe, bg;

// load the image files first 
function preload() {
  bg = loadImage('assets/background-day.png');
  flapUpImg = loadImage('assets/yellowbird-upflap.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  pipe = loadImage('assets/pipe-green.png');
  base = loadImage('assets/base.png');
}

function setup() {
  new Canvas(400           , 600);
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
  //Initialise Group
  pipes = new Group();
  // Floor
  floor = new Sprite(0, height - 20, 400, 125, 'static' );
  floor.img = base;
}

function draw() {
  background = image(bg, 0, 0, width, height); // background image
  bird.x += 3; // bird moves forward
  // camera tracking and item tracking
  camera.x = bird.x;
  floor.x = camera.x;

  if (kb.presses('space') || mouse.presses()) {
    bird.vel.y = -5; // flap upward
  }

   // change image according to  flying action/ falling
  if (bird.vel.y < -1) {
    bird.img = flapUpImg; // flying upward
    bird.rotation = -30
  } else if (bird.vel.y > 1) {
    bird.img = flapDownImg; // falling
    bird.rotation = 30
  } else {
    bird.img = flapMidImg; // neutral
    bird.rotation = 0
  }

  // Spawn pipes
  // spawn the first pipe
  if (frameCount === 1) {
    spawnPipePair();
  }

  //spawn pipe every 1.5 s
  if (frameCount % 90 === 0) {
    spawnPipePair();
  }

  // Remove offscreen pipes
  for (let pipe of pipes) {
    if (pipe.x < -50) pipe.remove();
  }

}

function spawnPipePair() {
  let gap = 50;
  let midY = random(200, height - 200); // random(min, max)

  let topPipe = new Sprite(bird.x + 300, midY - gap / 2 - 200, 52, 320, 'static');
  let bottomPipe = new Sprite(bird.x + 300, midY + gap / 2 + 200, 52, 320, 'static');
  topPipe.img = pipe
  topPipe.rotation = 180
  bottomPipe.img = pipe;
  topPipe.passed = false; // Add to one pipe per pair (top or bottom)
  pipes.add(topPipe); // add topPipe sprite to group
  pipes.add(bottomPipe); // add bottomPipe sprite to group
  pipes.layer = 0; // The new pipes should be drawn at the lowest layer, so the score and floor will show on top.
}