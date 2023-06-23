let cameraCtrl;
let controller;
let axis;
let heat;
let divButtons;
let divSliders;

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('p5-sketch');

  axis = new Axis();
  cam = new Camera();
  widgets = new Widgets();
  

}


function draw() {
  background(0);
  cam.update();
  axis.show();
  widgets.update();

  if (widgets.run == 2) {
    heat = new heatObject(widgets);
  }
  if (widgets.run == 0) {

  }
  if (widgets.run == 1) {
    heat.compute();
  }
  heat.show3D()
}

function mouseWheel(event) {
  if (keyIsPressed) {
    event.preventDefault()
    cam.rotation(event);
  }
  else if (mouseIsOverCanvas()) {
    event.preventDefault()
    cam.zoom(event); // Zoom in/out the scene.
  }

}

function mousePressed() {
  if (mouseIsOverCanvas()) {
    cam.mousePressed();
  }
}

function mouseDragged() {
  if (mouseIsOverCanvas()) {
    cam.translation();
  }
}

function mouseIsOverCanvas() {
  return (
    mouseX >= 0 &&
    mouseY >= 0 &&
    mouseX <= canvas.width / 2 &&
    mouseY <= canvas.height / 2)
}


