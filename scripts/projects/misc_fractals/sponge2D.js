let maximum = 2;

function setup() {
  let can = createCanvas(windowWidth*0.4, windowWidth*0.4);
  can.parent('fractals-sponge2D');
  noLoop();
  stroke('white') 
}
function draw() {
  background("black")
  sponge2D(0, 0, width, 1)
}

function sponge2D(x, y, length, level){
  if  (level == maximum){
    strokeWeight(0)
    push()
    fill('red')
    square(x, y, length);
    pop()
  }else{
    sponge2D(x, y, length/3, level + 1);
    sponge2D(x + length/3, y, length/3, level + 1)
    sponge2D(x, y + length/3, length/3, level + 1)
    sponge2D(x + 2*length/3, y, length/3, level + 1)
    sponge2D(x, y + 2*length/3, length/3, level + 1)
    sponge2D(x + 2*length/3, y + 2*length/3, length/3, level + 1)
    sponge2D(x + 2*length/3, y + length/3, length/3, level + 1)
    sponge2D(x + length/3, y + 2*length/3, length/3, level + 1)
  }
}

function mouseClicked(){
  if (maximum < 6){
    maximum++;
    draw()
  }
}