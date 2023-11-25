function getDistance(point1, point2) {
  return sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);
}

function circumCenter(A, B, C) {
  let AB = getDistance(A, B);
  let BC = getDistance(B, C);
  let CA = getDistance(C, A);

  let D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  let Ux =
    ((A.x * A.x + A.y * A.y) * (B.y - C.y) +
      (B.x * B.x + B.y * B.y) * (C.y - A.y) +
      (C.x * C.x + C.y * C.y) * (A.y - B.y)) /
    D;
  let Uy =
    ((A.x * A.x + A.y * A.y) * (C.x - B.x) +
      (B.x * B.x + B.y * B.y) * (A.x - C.x) +
      (C.x * C.x + C.y * C.y) * (B.x - A.x)) /
    D;
  return new Point(Ux, Uy);
}

function makeCircumCircle(triangle) {
  let A = triangle.A;
  let B = triangle.B;
  let C = triangle.C;
  let center = circumCenter(A, B, C);
  let radius = getDistance(center, A);
  return new Circle(center.x, center.y, radius);
}

function makeSuperTriangle(points){
  let c = max(width, height);
  let pt1 = new Point(-c, height);
  let pt2 = new Point(width + c, height);
  let pt3 = new Point(width / 2, -2*c);
  return new Triangle(pt1, pt2, pt3);
}

function makeSubTriangles(point, triangle){
  let tri1 = new Triangle(point, triangle.A, triangle.B);
  let tri2 = new Triangle(point, triangle.B, triangle.C);
  let tri3 = new Triangle(point, triangle.C, triangle.A);
  return [tri1, tri2, tri3];
}

function dotProd(vec1, vec2){
  let x = vec1.x * vec2.y - vec1.y * vec2.x;
  let y = vec1.y * vec2.x - vec1.x * vec2.y;
  return {x:x, y:y};
}