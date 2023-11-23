let arrows = [];
let field;
let nbr = 20;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("main-animation");
  for (let j = 0; j <= nbr; j++) {
    let line_ = [];
    for (let i = 0; i <= nbr; i++) {
      line_.push(
        new Arrow(createVector((j * width) / nbr, (i * height) / nbr))
      );
    }
    arrows.push(line_);
  }
  field = new VectorField(arrows);
}

function draw() {
  background(0);
  field.show();
}

class VectorField {
  constructor(arrows) {
    this.arrows = arrows;
  }
  show() {
    for (let i = 0; i < this.arrows.length; i++) {
      for (let j = 0; j < this.arrows[0].length; j++) {
        this.arrows[i][j].update();
        this.arrows[i][j].show();
      }
    }
  }
}

class Arrow {
  constructor(start) {
    this.start = start;
    this.dir = createVector(mouseX, mouseY);
    this.len = 20;
    this.update();
  }

  show() {
    let angle = atan2(this.dir.y - this.start.y, this.dir.x - this.start.x);

    push();
    translate(this.start.x, this.start.y);
    rotate(angle);
    let clr = map(this.dist_to_mouse ** 1 / 6, 0, width ** 1 / 6, 255, 0);
    stroke(clr, 130, 0);
    fill(clr, 130, 0);
    strokeWeight(5);
    line(0, 0, this.len, 0);
    let edges = map(this.dist_to_mouse, 0, 2 * width, 2, 0);
    triangle(
      this.len,
      0,
      this.len - edges,
      -edges,
      this.len - edges,
      edges
    );
    pop();
  }

  update() {
    this.dir = createVector(mouseX, mouseY);
    this.dist_to_mouse = dist(this.start.x, this.start.y, mouseX, mouseY);
    this.len = map(
      this.dist_to_mouse,
      0,
      width,
      min(width, height) / nbr / 2,
      5
    );
  }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
     arrows = [];
     setup();
  }
