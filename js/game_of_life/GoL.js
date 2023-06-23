let grid;
let button;
let run = 0;
let time_count = 0;

let widgets;

function setup() {
  let canvas = createCanvas(0.8*windowWidth, 0.9*windowHeight);
  canvas.parent('p5-sketch');

  game = new Game(100, 70);
  widgets = new Widgets();
  
  frameRate(30);
}

function draw() {
  background(0);
  widgets.update();
  game.show();
  
  if (run && time_count % (100 - widgets.sliderSpeed.value()) == 0){
    game.updateGrid()
  }
  time_count++;

}

function windowResized(){
    resizeCanvas(0.8*windowWidth, 0.8*windowHeight);
    setup();
}

