let scoreLabel;
let bg;

function preload() {
   bg = loadImage('assets/background-day.png');
}

function setup() {
    new Canvas(400, 600);
    scoreLabel = new Sprite(width/2, 50, 50,50);
    scoreLabel.color = "rgba(108, 9, 154, 0.1)";
    scoreLabel.stroke = "rgba(160, 46, 46, 0.5)";
    scoreLabel.strokeWeight = 0;
    scoreLabel.text = "Hello";
    scoreLabel.textSize = 32;
    scoreLabel.textStroke = 4;
    scoreLabel.textFill = "white";
    scoreLabel.textStroke = "rgba(92, 86, 128, 0.82)" ;
    scoreLabel.textStrokeWeight = 10;

}

function draw() {
  image(bg, 0, 0, width, height); // draw background
}
