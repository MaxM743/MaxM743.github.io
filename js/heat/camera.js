class Camera {
  constructor() {
    this.camZ = 857.6000000000009;
    this.shiftX = -304;
    this.shiftY = -335;
    this.startX = 866;
    this.startY = 358;
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
  }

  update() {
    camera(0, 0, this.camZ);
    translate(this.shiftX, this.shiftY);
    rotateX(this.angleX); // rotate the canvas around the X axis
    rotateY(this.angleY); // rotate the canvas around the Y axis
    rotateZ(this.angleZ); // rotate the canvas around the Z axis
  }

  zoom(event) {
    this.camZ += event.delta * 0.2;
  }

  translation() {
    if (mouseY < height) {
      let ddx = mouseX - this.startX;
      let ddy = mouseY - this.startY;
      this.shiftX += 1.2 * ddx;
      this.shiftY += 1.2 * ddy;
      this.startX = mouseX;
      this.startY = mouseY;
    }
  }

  rotation(event) {
    if (keyCode == 65) {
      this.angleX += event.delta * 0.01;
    }
    if (keyCode == 90) {
      this.angleY += event.delta * 0.01;
    }
    if (keyCode == 69) {
      this.angleZ += event.delta * 0.01;
    }
  }

  mousePressed() {
    if (mouseY < height) {
      this.startX = mouseX;
      this.startY = mouseY;
    }
  }
}