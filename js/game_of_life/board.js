class Game {
    constructor(Nx, Ny) {
      this.Nx = Nx;
      this.Ny = Ny;
      this.grid = this.newGrid(Nx, Ny);
    }
  
    newGrid() {
      let grid = [];
      for (let i = 0; i < this.Nx; i++) {
        let line_ = [];
        for (let j = 0; j < this.Ny; j++) {
          line_.push(0);
        }
        grid.push(line_);
      }
      this.grid = grid;
    }
  
    show() {
      let Ny = this.grid[0].length;
      let Nx = this.grid.length;
      for (let i = 0; i < Nx; i++) {
        let x = i * width / Nx;
        for (let j = 0; j < Ny; j++) {
          let y = j * height / Ny;
  
          push();
          stroke("white");
          strokeWeight(1);
          //rect(x, y, width / this.grid[0].length, height / this.grid.length);
          fill("white")
          
          if (this.grid[i][j] === 0) {
            let diam =  0.1*width / this.grid[0].length;
            circle(x + width / this.grid[0].length / 2, y + height / this.grid.length/2, diam);
          }
          if (this.grid[i][j] === 1) {
            let diam =  0.5*width / this.grid[0].length;
            circle(x + width / this.grid[0].length / 2, y + height / this.grid.length/2, diam);
          }
          pop();
        }
      }
    }
  
    updateCell(x, y) {
      let sizeX = width/this.grid.length; 
      let sizeY = height/this.grid[0].length;
      let index_x = int(map(x, 0, width, 0, this.grid.length));
      let index_y = int(map(y, 0, height, 0, this.grid[0].length));
      this.grid[index_x][index_y] = (this.grid[index_x][index_y] + 1) % 2;
    }
  
    updateGrid() {
      let new_grid = copyGrid(this.grid);
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
  
          if (this.grid[i][j] == 0) {
            if (this.neighbourCount(i, j) == 3) {
              new_grid[i][j] = 1;
            }
          }
  
          if (this.grid[i][j] == 1) {
            if (this.neighbourCount(i, j) != 2 && this.neighbourCount(i, j) != 3) {
              new_grid[i][j] = 0;
            }
          }
        }
      }
      this.grid = new_grid;
    }
  
    neighbourCount(i, j) {
      let count = 0;
      for (let k = -1; k <= 1; k++) {
        if (this.grid[(i - 1 + this.grid.length) % this.grid.length][(j + k + this.grid[0].length) % this.grid[0].length] == 1) {
          count++;
        }
        if (this.grid[(i + 1) % this.grid.length][(j + k + this.grid[0].length) % this.grid[0].length] == 1) {
          count++;
        }
      }
      if (this.grid[i][(j + 1 + this.grid[0].length) % this.grid[0].length] == 1) {
        count++;
      }
      if (this.grid[i][(j - 1 + this.grid[0].length) % this.grid[0].length] == 1) {
        count++;
      }
      return count;
    }
  }
  
  function mouseClicked() {

    if (MouseOnCanvas()) {
      game.updateCell(mouseX, mouseY);
    }
  }
  
  function copyGrid(grid) {
    let grid_copy = [];
    for (let i = 0; i < grid.length; i++) {
      let line_ = [];
      for (let j = 0; j < grid[0].length; j++) {
        line_.push(grid[i][j]);
      }
      grid_copy.push(line_);
    }
    return grid_copy;
  }
  
  

  function MouseOnCanvas(){
    return mouseX > 0 &&
           mouseX < width &&
           mouseY > 0 &&
           mouseY < height;
  }  