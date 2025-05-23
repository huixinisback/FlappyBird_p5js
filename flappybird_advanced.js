// player sprite
let bird;
// game variables
let pipes;
let floor;
let score = 99;
let startGame = false;
// store number/score images
let numberImages = [];

// Image sprites, sprites that display images.
let scoreDigits;
let gameOverLabel;
// sound assets
let flapSound;
let pointSound;
let failSound;

// load the image files first 
function preload(){
    bg = loadImage('assets/background-day.png');
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    pipe = loadImage('assets/pipe-green.png');
    base = loadImage('assets/base.png');
    gameOver = loadImage('assets/gameover.png');
    startMessage = loadImage('assets/message.png');
    // number assets
    for (let i = 0; i <= 9; i++) {
      numberImages[i] = loadImage(`assets/${i}.png`);
    }

    // sound assets
    flapSound = createAudio('assets/sfx_wing.mp3');
    pointSound = createAudio('assets/sfx_point.mp3');
    failSound = createAudio('assets/sfx_die.mp3');
}

function setup() {
  new Canvas(400, 600);
  world.gravity.y = 8; // bird falls

   // Bird with full physics
  bird = new Sprite(width / 2, 200, 30, 30, 'static');
  bird.img = flapMidImg;
  bird.mass = 2;         // heavier = stronger pull from gravity
  bird.drag = 0.02;      // air resistance
  bird.bounciness = 0.5; // how much it bounces when hitting floor

  pipes = new Group();
  floor = new Sprite(200, height - 20, 400, 125, 'static' );
  floor.img = base;

  //instructions
  startMessageLabel = new Sprite(width/2,height/2 - 50,50,50,'none');
  startMessageLabel.img = startMessage;

  // score
  scoreDigits = new Group();
  scoreDigits.collider = 'none';
  scoreDigits.color = 'rgba(0, 0, 0, 0)';
  scoreDigits.stroke = 'rgba(0, 0, 0, 0)';
  scoreDigits.layer = 1000;
}

function draw() {
  background = image(bg, 0, 0, width, height); // background image

  if (kb.presses('space') || mouse.presses()) {
    startGame = true;
    startMessageLabel.visible = false;
  }

  if (startGame){
    bird.collider = 'dynamic';
    bird.x += 3; // bird moves forward
    // camera tracking and item tracking
    camera.x = bird.x;
    floor.x = camera.x;

    if (kb.presses('space') || mouse.presses()) {
      bird.vel.y = -5; // flap upward
      flapSound.play();
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

    
    // increase score if pipe passed
    for (let pipe of pipes) {
      // compare x-coordinates of player and pipes
      if (pipe.passed== false && pipe.x + pipe.w / 2 < bird.x - bird.w / 2) {
        pipe.passed = true;
        pointSound.play();
        score++; 
      }
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
  
    drawScore(width / 2, 20, score);

    // End game on collision
    if (bird.collides(pipes)|| bird.collides(floor)) {
      failSound.play();
      gameOverLabel = new Sprite(width / 2, height / 2, 192, 42);
      gameOverLabel.img = gameOver;
      gameOverLabel.collider = 'none';
      gameOverLabel.color = 'rgba(0,0,0,0)';
      gameOverLabel.stroke = 'rgba(0,0,0,0)';
      gameOverLabel.layer = 1000; // draw on top
      gameOverLabel.x = camera.x;

      noLoop();

      setTimeout(()=>{
        score = 0;
        gameOverLabel.remove();
        pipes.removeAll();
        bird.vel.x = 0;
        bird.vel.y = 0;
        bird.rotation = 0;
        bird.collider = 'static';
        bird.y = 200;
        startGame = false;
        startMessageLabel.visible = true;
        startMessageLabel.x = bird.x;
        startMessageLabel.y = height/2 - 50;
      loop();
      }, 3000)
    }
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

function drawScore(x, y, score, digitWidth = 24, digitHeight = 36) {
  // Clear old digit sprites
  scoreDigits.removeAll();
  // make it a string so we can get each digit indivisually rather than a value
  let scoreStr = str(score);
  // total width taken up by all digits
  let totalWidth = scoreStr.length * digitWidth;
  // starting x coordinates
  let startX = x - totalWidth / 2;
  // loop through each digit
  for (let i = 0; i < scoreStr.length; i++) {
    let digit = int(scoreStr[i]);
    let digitSprite = new scoreDigits.Sprite(startX + i * digitWidth, y, digitWidth, digitHeight); // create sprite the size of the digit image
    digitSprite.img = numberImages[digit]; //get the digit image from the array based on placement order which corresponds to the digit
  }

  moveGroup(scoreDigits, camera.x); // keep score centered on camera
}

function moveGroup(group, targetX, spacing = 24) {
  let totalWidth = (group.length -1) * spacing;
  let startX = (targetX - totalWidth/2);
  for (let i = 0; i < group.length; i++) {
    group[i].x = startX + i * spacing;
  }
}

