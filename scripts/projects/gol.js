
let N = 20;
let start = 0;
let grid = [];
let copygrid = [];
function setup() {
  let can = createCanvas(600, 600);
  can.parent('game-of-life');
  noLoop();

  makeGrid();

  buttonstart = createButton("Start");
  buttonstart.mousePressed(beginGame);
  buttonend = createButton("Stop");
  buttonend.mousePressed(stopGame);
  buttonreset = createButton("Reset");
  buttonreset.mousePressed(resetGame);

  buttonstart.parent('game-of-life-widgets');
  buttonend.parent('game-of-life-widgets');
  buttonreset.parent('game-of-life-widgets');
  
 
}



function draw() {
  background(220);
  //draw the grid
  drawGrid();
  if (start == 1){
  
    step();
  }

}



function mousePressed(){ 
  let x = mouseX;
  let y = mouseY;
  if (mouseOnCanvas()){
    if (x < width && x > 0 && y > 0 && y < height){
      let i = int(map(x, 0, width, 0, N));
      let j = int(map(y, 0, height, 0, N));
      grid[j][i].swipeState();
      draw();
    }
  }
  
}

function mouseOnCanvas(){
  return (mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height);
}

function drawGrid(){
    let w = width;
    let h = height;
    let len = w/N;
    for (let i = 0; i < N; i++){
      let y = i*len;
      for (let j = 0; j < N; j++){
        let x = j*len;
        if (grid[i][j].state == 0){
          fill("red");
          square(x, y, len);
        }
        else{
          fill("green");
          square(x, y, len);}
      }
    }
}
// vivant et < 2 voisins --> mort
// vivant avec 2 ou 3 voisins --> reste en vie
// vivant avec > 3 voisins --> mort
// mort avec 3 voisins --> vie 


function step(){  
  let tempo = grid;
  for (let ligne of tempo){
    for (let cell of ligne){
        let n = neigh(cell, tempo); 
        if (cell.state == 1 && n < 2){
           cell.change = 0;
        }
        if (cell.state == 1 && n == 2){
        }
        if (cell.state == 1 && n == 3){
        }
        if (cell.state == 1 && n > 3){
           cell.change = 0;
        }
        if (cell.state == 0 && n == 3){
           cell.change = 1;
        } 
    }
  }
  for (let i = 0; i < N; i++){
    for (let j = 0; j < N; j++){
      grid[i][j].state = grid[i][j].change; 
    }
  }
  
}

function neigh(cell){
  let tempo = grid;
  let j = cell.pos.x;
  let i = cell.pos.y;
  let n = 0;
  if (tempo[(i+1) - floor((i+1) / N) * N][j].state == 1){
     n += 1;
  }
  if (tempo[(i-1) - floor((i-1) / N) * N][j].state == 1){
     n += 1;
  }
    if (tempo[i][(j+1) - floor((j+1) / N) * N].state == 1){
     n += 1;
  }
    if (tempo[i][(j-1) - floor((j-1) / N) * N].state == 1){
     n += 1;
  }
  if (tempo[(i-1) - floor((i-1) / N) * N][(j-1) - floor((j-1) / N) * N].state == 1){
     n += 1;
  }
  if (tempo[(i-1) - floor((i-1) / N) * N][(j+1) % N].state == 1){
     n += 1;
  }
  if (tempo[(i+1) - floor((i+1) / N) * N][(j-1) - floor((j-1) / N) * N].state == 1){
     n += 1;
  }
    if (tempo[(i+1) - floor((i+1) / N) * N][(j+1) - floor((j+1) / N) * N].state == 1){
     n += 1;
  }
  return n 
}

function beginGame(){
  start = 1;
  draw();
  loop();
}

function stopGame(){
  start = 0;
  noLoop();
}

function makeGrid(){
  for (let i = 0; i < N; i++){
    let a = [];
    let b = []; 
    for (let j = 0; j < N; j++){
      let cell = new Cell();
      let cell2 = new Cell();
      cell.pos.x = i;
      cell.pos.y = j;
      a.push(cell);
      b.push(cell2);
    }
    grid.push(a);
    copygrid.push(a);
  } 
}
function resetGame(){
  start = 0;
  grid = [];
  copygrid = [];
  makeGrid();
  draw();
}

class Cell{
    constructor(){
      this.pos = createVector(); 
      this.state = 0; //initialized as dead
      this.neight = 0;//number of neighbour alive
      this.change = 0;
    }
    swipeState(){
      if (this.state == 0){
        this.state = 1;
        
      }
      else{
        this.state = 0;
      }
    }
  }