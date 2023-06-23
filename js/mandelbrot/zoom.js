class Zoom{
  constructor(){
    this.start = createVector(xbounds[0], ybounds[0]);
    this.end = createVector(xbounds[1], ybounds[1]);
  }
  update(){
    let xStart = map(this.start.x, 0, width, history[history.length - 1].xb[0], history[history.length - 1].xb[1]);
    let xEnd = map(this.end.x, 0, width, history[history.length - 1].xb[0], history[history.length - 1].xb[1]);
    let yStart = map(this.start.y, 0, height, history[history.length - 1].yb[0], history[history.length - 1].yb[1]);
    let yEnd = map(this.end.y, 0, height, history[history.length - 1].yb[0], history[history.length - 1].yb[1]);
    
    history.push({xb:[xStart, xEnd], yb:[yStart, yEnd], iter:maxIterations});
  
    draw();
  }

}


function mouseOnCanvas() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}

function mouseDragged(){
  if (mouseOnCanvas()){
    updatePixels();
    let size = mouseX - zoom.start.x;
    noFill();
    stroke('white')
    strokeWeight(2)
    square(zoom.start.x, zoom.start.y, size);    
  }
}

function mousePressed() {
  if (mouseOnCanvas()) {
    zoom.start = createVector(mouseX, mouseY);
  }
}

function mouseReleased(){
  if (mouseOnCanvas()){
    let size = mouseX - zoom.start.x;
    zoom.end = createVector(zoom.start.x+size, zoom.start.y+size)
    zoom.update();
    py = 0;
    
  }
  
  
}
