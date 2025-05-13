// player sprite
let bird;
// game variables
let pipes;
let floor;
let score = 0;

let scoreLabel;

// load the image files first 
function preload(){
  bg = loadImage('assets/background-day.png');
  flapUpImg = loadImage('assets/yellowbird-upflap.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  pipe = loadImage('assets/pipe-green.png');
  base = loadImage('assets/base.png')
  gameOver = loadImage('assets/gameover.png')
}

function setup() {
  new Canvas(400, 600);
  world.gravity.y = 8; // bird falls

  bird = new Sprite(100, height / 2, 30, 30);
  bird.img=flapMidImg; // neutral image

  pipes = new Group();
  floor = new Sprite(0, height - 20, 400, 125, 'static' );
  floor.img = base;

  scoreLabel = new Sprite(width / 2, 30);
  scoreLabel.textSize = 32;
  scoreLabel.text = 'Score: 0';
  // Make the sprite's box invisible
  scoreLabel.color = 'rgba(0, 0, 0, 0)'; // fully transparent fill
  scoreLabel.stroke = 'rgba(0, 0, 0, 0)'; // fully transparent stroke
  scoreLabel.collider = 'none';
  // Make the text white
  scoreLabel.textColor = 'white';
}

function draw() {
  image(bg, 0, 0, width, height); // background image
  bird.x += 3; // bird moves forward
  // camera tracking and item tracking
  camera.x = bird.x;
  floor.x = camera.x;

  if (kb.presses('space') || mouse.presses()) {
    bird.vel.y = -5; // flap upward
  }

  // Spawn pipes
  // spawn the first pipe
  if (frameCount === 1) {
    spawnPipePair();
  }

  //spawn pipe every 90s
  if (frameCount % 90 === 0) {
    spawnPipePair();
  }

  // Remove offscreen pipes
  for (let pipe of pipes) {
    if (pipe.x < -50) pipe.remove();
  }

  // increase score if pipe passed
  for (let pipe of pipes) {
    // compare coordinate
    if (pipe.passed== false && pipe.x + pipe.w / 2 < bird.x - bird.w / 2) {
      pipe.passed = true;
      score++; 
    }
    
  }

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
  pipes.layer = 0
  
  // End game on collision
  if (bird.collides(pipes)|| bird.collides(floor)) {
    noLoop();
    image(gameOver, (width-192)/2, (height-42)/2, 192 , 42);
  }

  scoreLabel.text = 'Score: ' + score;
  scoreLabel.x = camera.x;

}

function spawnPipePair() {
  let gap = 100;
  let midY = random(200, height - 200);

  let topPipe = new Sprite(bird.x + 300, midY - gap / 2 - 200, 52, 320, 'static');
  let bottomPipe = new Sprite(bird.x + 300, midY + gap / 2 + 200, 52, 320, 'static');
  topPipe.img = pipe
  topPipe.rotation = 180
  bottomPipe.img = pipe;
  topPipe.passed = false; // Add to one pipe per pair (top or bottom)

  pipes.add(topPipe);
  pipes.add(bottomPipe);
}
