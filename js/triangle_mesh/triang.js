class Triangle{
  constructor(pt1, pt2, pt3){
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.pt3 = pt3;
    this.index = 0;
    this.isIn = false;
  }
  
  isMouseIn(){
    let mousePos = createVector(mouseX, mouseY);
    // Calculate vectors from the triangle vertices to the mouse position
    let v0 = createVector(this.pt3.x - this.pt1.x, this.pt3.y - this.pt1.y);
    let v1 = createVector(this.pt2.x - this.pt1.x, this.pt2.y - this.pt1.y);
    let v2 = createVector(mousePos.x - this.pt1.x, mousePos.y - this.pt1.y);

    // Compute dot products
    let dot00 = v0.dot(v0);
    let dot01 = v0.dot(v1);
    let dot02 = v0.dot(v2);
    let dot11 = v1.dot(v1);
    let dot12 = v1.dot(v2);


    // Compute barycentric coordinates
    let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    let v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    // Check if the point is inside the triangle
    return u >= 0 && v >= 0 && u + v <= 1;
  }
  show(){
    fill(colors[this.index]);
    strokeWeight(0.5);
    stroke('white');
  
    triangle(this.pt1.x, this.pt1.y, this.pt2.x, this.pt2.y, this.pt3.x, this.pt3.y)
  }
}

  
  
  