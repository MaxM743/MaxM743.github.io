let frame = 0;
let bag = [];
let count = 30000;
let n = 1;
let m = 2;
let delta = 0.05;

function setup() {
  can = createCanvas(windowWidth/3, windowWidth/3);
  can.parent('chaldni')
  background(0);
  frameRate(30);
  
  Nslider = createSlider(1, 20, 1, 1);
  Mslider = createSlider(2, 20, 5, 1);

  Nslider.parent('chaldni-widgets')
  Mslider.parent('chaldni-widgets')

  
  for (let i = 0; i < count; i++) {
    let sand = new Sand();
    sand.show();
    bag.push(sand);
  }
}

function draw() {

  n = Nslider.value();
  m = Mslider.value();
  
  if (n > m){
    Nslider.value(m - 1);
  
  }
  
  if (frame % 5 == 0) {
    background(0);
    for (let i = 0; i < count; i++) {
      bag[i].move();
      bag[i].show();
    } 
  }
}

class Sand {
  constructor() {
    this.pos = createVector(random(-1, 1), random(-1, 1));
  }

  show() {
    let x = map(this.pos.x, -1, 1, 0, width);
    let y = map(this.pos.y, -1, 1, 0, height);
    push();
      fill('yellow');
      circle(x, y, 5);
    pop();
  }

  move() {
    let ampl = amplitude(this.pos.x, this.pos.y, n, m);
    let angle = random(0, 2 * PI);
    let dir = p5.Vector.fromAngle(angle);
    let dr = p5.Vector.mult(dir, delta * ampl);
    this.pos.add(dr);
  }
}

function amplitude(x, y, n, m) {
  return abs(sin(n * PI * x / 2) * sin(m * PI * y / 2) - sin(m * PI * x / 2) * sin(n * PI * y / 2));  
}