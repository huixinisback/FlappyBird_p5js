let bird;
let pipes;
let score = 99;
// store number images
let numberImages = []



function preload(){
    bg = loadImage('assets/background-day.png');
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    pipe = loadImage('assets/pipe-green.png');
    base = loadImage('assets/base.png')
    gameOver = loadImage('assets/gameover.png')
    // number assets
    for (let i = 0; i <= 9; i++) {
      numberImages[i] = loadImage(`assets/${i}.png`);
    }
}

function setup() {
  new Canvas(400, 600);
  world.gravity.y = 8; // bird falls

  bird = new Sprite(100, height / 2, 30, 30);
  bird.img=flapMidImg

  pipes = new Group();
  floor = new Sprite(0, height - 20, 400, 125, 'static' );
  floor.img = base;

}

function draw() {
  background = image(bg, 0, 0, width, height);
  bird.x += 3;
  camera.x = bird.x;
  floor.x = camera.x;

  if (kb.presses('space') || mouse.presses()) {
    bird.vel.y = -5; // flap upward
  }

  // Spawn pipes
  if (frameCount === 1) {
    spawnPipePair();
  }
  if (frameCount % 90 === 0) {
    spawnPipePair();
  }

  // Remove offscreen pipes
  for (let pipe of pipes) {
    if (pipe.x < -50) pipe.remove();
  }

  for (let pipe of pipes) {
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
  drawScore(width / 2, 20, score);

  // End game on collision
  if (bird.collides(pipes)|| bird.collides(floor)) {
    noLoop()
    image(gameOver,(width-192)/2, (height-42)/2, 192 , 42);

  }

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

function drawScore(x, y, score, digitWidth = 24, digitHeight = 36) {
  let scoreStr = str(score);
  let totalWidth = scoreStr.length * digitWidth;
  let startX = x - totalWidth / 2;

  for (let i = 0; i < scoreStr.length; i++) {
    let digit = int(scoreStr[i]);
    number = image(numberImages[digit], startX + i * digitWidth, y, digitWidth, digitHeight);
  }

}

