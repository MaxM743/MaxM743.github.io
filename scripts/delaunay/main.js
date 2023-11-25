let points;
let super_triangle;
let mesh;
let mouseClicked;;

function setup() {
  let cnv = canvas = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('z-index', '-1');
  cnv.style('position', 'fixed');

  mouseClicked = false;
  points = [];
  for (let i = 0; i < min(width, height)/3; i++) {
    let x = random(0.1 * width, width * 0.9);
    let y = random(0.1 * height, height * 0.9);
    points.push(new Point(x, y));
  }
  super_triangle = makeSuperTriangle();
  mesh = triangulation(points);
}

function draw() {
  for (let triangle of mesh) {
    if (triangle.contains(new Point(mouseX, mouseY)) || mouseClicked) {
      let color = getColor(triangle);
  
      triangle.fill = color;
      triangle.strokeW = 0;
    }
    triangle.show();
  }

}

function getColor(triangle) {
  let dist = getDistance(triangle.A, { x: width / 2, y: height / 2 });
  let c = map(dist, 0, width/2, 255, 0);
  return color(c, 0, c/2);
}

function triangulation(vertices) {
  let triangles = [super_triangle];

  for (let vertex of vertices) {
    triangles = addVertex(vertex, triangles);
  }
  let final_triangles = [];
  for (let triangle of triangles) {
    if (!triangle.shareVertex(super_triangle)) {
      final_triangles.push(triangle);
    }
  }
  triangles = final_triangles;

  return triangles;
}

function addVertex(vertex, triangles) {
  //Find the bad triangles
  let badTriangles = [];
  let edges = [];
  for (let triangle of triangles) {
    if (triangle.contains(vertex)) {
      let edge1 = new Edge(triangle.A, triangle.B);
      let edge2 = new Edge(triangle.B, triangle.C);
      let edge3 = new Edge(triangle.C, triangle.A);
      edges.push(edge1, edge2, edge3);
      badTriangles.push(triangle);
    }
  }

  // Remove the bad triangles from the triangulation
  let tempoTriangles = [];
  for (let triangle of triangles) {
    if (badTriangles.indexOf(triangle) == -1) {
      tempoTriangles.push(triangle);
    }
  }
  triangles = tempoTriangles;

  // Ensure that the edges are unique (no two edges are the same)

  edges = uniqueEdges(edges);

  // Create new triangles from the unique edges and the vertex
  for (let edge of edges) {
    triangles.push(new Triangle(edge.A, edge.B, vertex));
  }
  return triangles;
}

function uniqueEdges(edges) {
  let uniqueEdges = [];
  for (let edge1 of edges) {
    let isUnique = true;
    for (let edge2 of edges) {
      if (edge1 != edge2 && edge1.equals(edge2)) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) {
      uniqueEdges.push(edge1);
    }
  }
  return uniqueEdges;
}

function mousePressed() {
  mouseClicked = true;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

