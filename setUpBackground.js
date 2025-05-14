let bird;
let step = 0;


function preload(){
    bg = loadImage('assets/background-day.png');
}

function setup() {
  new Canvas(400, 600); // based on the size of the background image used
}
function draw() {
    //background("blue"); // background colour
    //background("#0452"); // background color hex code
    //background("rgba(224, 131, 174, 0.5)"); // background color rgba
    //background = image(bg, 0, 0, width, height); // background image
    image(bg, 0, 0, width, height);
  }
