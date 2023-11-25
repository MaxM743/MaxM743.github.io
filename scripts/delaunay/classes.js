class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equals(point) {
    return this.x == point.x && this.y == point.y;
  }
  show() {
    push();
    strokeWeight(10);
    stroke(255);
    circle(this.x, this.y, 10);
    pop();
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  contains(point) {
    let d = Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2);
    return d < this.r;
  }
}

class Edge {
  constructor(A, B) {
    this.A = A;
    this.B = B;
  }
  equals(edge) {
    return (this.A == edge.A && this.B == edge.B) || (this.A == edge.B && this.B == edge.A);
  }
}

class Triangle {
  constructor(A, B, C) {
    this.A = A;
    this.B = B;
    this.C = C;
    this.circumcircle = makeCircumCircle(this);
    this.fill = "black";
    this.strokeW = 0.1;
  }
  contains(point) {
    let d = getDistance(this.circumcircle, point);
    return d <= this.circumcircle.r;
  }
  show() {
    push();
    strokeWeight(0);
    noStroke()
    fill(this.fill);
    
    triangle(this.A.x, this.A.y, this.B.x, this.B.y, this.C.x, this.C.y);
    pop();
  }

  shareVertex(triangle) {
    if (triangle.A.equals(this.A) || triangle.A.equals(this.B) || triangle.A.equals(this.C)) {
      return true;
    }
    if (triangle.B.equals(this.A) || triangle.B.equals(this.B) || triangle.B.equals(this.C)) {
      return true;
    }
    if (triangle.C.equals(this.A) || triangle.C.equals(this.B) || triangle.C.equals(this.C)) {
      return true;
    }
    return false;
  }
  area() {
    let vec1 = { x: this.B.x - this.A.x, y: this.B.y - this.A.y };
    let vec2 = { x: this.C.x - this.A.x, y: this.C.y - this.A.y };
    let dp = dotProd(vec1, vec2);
    return 0.5 * sqrt(dp.x ** 2 + dp.y ** 2);
  }
  mouseIn(point) {
    let sub_tri = makeSubTriangles(point, this);
    let sub_area = 0;
    for (let sub of sub_tri) {
      sub_area += sub.area();
    }
    let big_area = this.area();
    if (abs(big_area - sub_area) < 0.001) {
      return true;
    } else {
      return false;
    }
  }
}

class Source {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.power = random(0, 100);
    this.isHolded = false;
  }
  show() {
    push();
    strokeWeight(10);
    stroke(255);
    circle(this.x, this.y, 20);
    pop();
  }
  contains(point) {
    let d = getDistance(this, point);

    return d < 20;
  }
}

