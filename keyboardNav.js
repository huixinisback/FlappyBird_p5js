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

  // move left while holding LEFT key
  if (kb.pressing('left')) {
    bird.x -= 4;
  }

  // move up when SPACE is pressed
  if (kb.presses('space')) {
    bird.y -= 50;
  }

  // return to center when keys are released
  if (!kb.pressing('left') && !kb.pressing('space')) {
    if(bird.x <= width/2){
        bird.x +=2;
    }
    if(bird.y <= height/2){
        bird.y += 2;
    }
  }
}
