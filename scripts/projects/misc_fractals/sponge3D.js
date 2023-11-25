let maximum2 = 1;
let startingLength = 2000;
let timeFrame = 0;
let boxes = [];

let buttonLevel;
let cameraCtrl;
let axis;


function setup() {
  let can3D = createCanvas(windowWidth*0.4, windowWidth*0.4, WEBGL);
  can3D.parent('fractals-sponge3D');
  normalMaterial();
  stroke('white')
  strokeWeight(1)
  frameRate(30)
  
  buttonLevel = createButton("Next Level");
  buttonLevel.mousePressed(nextStep);
  buttonLevel.parent('fractals-sponge3D-widgets');
  
  
  cameraCtrl = new Camera();
  axis = new Axis();
  
  sponge(0, 0, 0, startingLength, 1)
}

function draw() {
  background(180)
  
  
  ambientLight(60);
  let locX = width / 2;
  let locY = height / 2;
  pointLight(255, 255, 255, locX, locY, 50);
  specularMaterial(250);
  shininess(50);

  cameraCtrl.update()
  
  axis.show()
  
  for (let box_ of boxes){
    box_.show();
  }

  timeFrame += 0.01;
}

function sponge(x, y, z, length, level){
  if (level == maximum2){
    boxes.push(new Box(x, y, z, length, level));
  }else{
    sponge(x, y, z, length/3, level+1);
    sponge(x+length/3, y, z, length/3, level+1);
    sponge(x+2*length/3, y, z, length/3, level+1);
    
    sponge(x, y+length/3, z, length/3, level+1);

    sponge(x+2*length/3, y+length/3, z, length/3, level+1);
    
    sponge(x, y+2*length/3, z, length/3, level+1);
    sponge(x+length/3, y+2*length/3, z, length/3, level+1);
    sponge(x+2*length/3, y+2*length/3, z, length/3, level+1);
    
    
    sponge(x, y, z + length/3, length/3, level+1);
 
    sponge(x+2*length/3, y, z + length/3, length/3, level+1);
    
    sponge(x, y+2*length/3, z+length/3, length/3, level+1);

    sponge(x+2*length/3, y+2*length/3, z+length/3, length/3, level+1);
    
    sponge(x, y, z + 2*length/3, length/3, level+1);
    sponge(x+length/3, y, z + 2*length/3, length/3, level+1);
    sponge(x+2*length/3, y, z + 2*length/3, length/3, level+1);
    
    sponge(x, y+length/3, z+2*length/3, length/3, level+1);

    sponge(x+2*length/3, y+length/3, z+2*length/3, length/3, level+1);
    
    sponge(x, y+2*length/3, z+2*length/3, length/3, level+1);
    sponge(x+length/3, y+2*length/3, z+2*length/3, length/3, level+1);
    sponge(x+2*length/3, y+2*length/3, z+2*length/3, length/3, level+1);
      
  }
}

function nextStep(){
  if (maximum2 < 5){
    maximum2++;
    boxes = [];
    
    let nbr = 3 ** (maximum2-1);
    let len = startingLength / nbr;
    let shift = nbr*len/2 - len/2;
    sponge(-shift, -shift, -shift, startingLength, 1)
  }else{
    print(boxes.length)
  }
}


class Box{
  constructor(x, y, z, length, level){
    this.pos = createVector(x, y, z);
    this.len = length;
    this.level = level;
  }

  show(){
    push()
      translate(this.pos.x, this.pos.y, this.pos.z);
      box(this.len)
    pop()
  }  
}

class Camera{
  constructor(){
    
    this.camZ = 3000;
    this.shiftX = 0;
    this.shiftY = 0;
    this.startX = 0;
    this.startY = 0;
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
    
  }
  update(){
    camera(0, 0, this.camZ);
    translate(this.shiftX, this.shiftY);
    rotateX(this.angleX); // rotate the canvas around the X axis
    rotateY(this.angleY); // rotate the canvas around the Y axis
    rotateZ(this.angleZ); // rotate the canvas around the Z axis
  }
  
  zoom(event){
    this.camZ += event.delta * 0.2;
  }
  
  
  translation(){  
    if (mouseY < height){
      let ddx = mouseX - this.startX;
      let ddy = mouseY - this.startY;
      this.shiftX += 1.2*ddx; 
      this.shiftY += 1.2*ddy;
      this.startX = mouseX; 
      this.startY = mouseY;
    }
  }
  
  rotation(event){
    
    if(keyCode == 65){
      this.angleX += event.delta * 0.01; 
    }
    if(keyCode == 90){
      this.angleY += event.delta * 0.01; 
    }
    if(keyCode == 69){
      this.angleZ += event.delta * 0.01;
    }
  }
  
  mousePressed(){
    if (mouseY < height){
      this.startX = mouseX; 
      this.startY = mouseY;
    }     
  }  
  
  
}


function mouseWheel(event){
  if (mouseOnCanvas()){
      if (keyIsPressed){
      cameraCtrl.rotation(event);
      }
      else{
      cameraCtrl.zoom(event); // Zoom in/out the scene.
      }
      return false
  }
  
}

function mousePressed() {
  cameraCtrl.mousePressed();
  print(mouseX, mouseY)
}

function mouseDragged() {
  if (mouseOnCanvas()){
      cameraCtrl.translation();
  }
}

function mouseOnCanvas(){
  return (mouseX > 0 &&
          mouseX < width &&
          mouseY > 0 &&
          mouseY < height)
}
  
class Axis{
  constructor(){
    
  }
  
  show(){
    let weights = [1, 1, 1];
    if (keyIsPressed){
      if (keyCode == 65){
        weights[0] = 4;
      }
      else if (keyCode == 90){
        weights[1] = 4;
      }
      else if (keyCode == 69){
        weights[2] = 4;
      }
    }else{
      weights = [1, 1, 1];
    }

    push()
      strokeWeight(weights[0]);
      stroke('red');
      line(-startingLength, 0, 0, startingLength, 0, 0);
    pop()
    push()
      strokeWeight(weights[1]);
      stroke('green');
      line(0, -startingLength, 0, 0, startingLength, 0);
    pop()
    push()
      strokeWeight(weights[2]);
      stroke('blue');
      line(0, 0, -startingLength, 0, 0, startingLength);
    pop()
  }
  
  
}
  
    

