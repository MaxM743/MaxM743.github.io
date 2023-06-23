class heatObject{
  constructor(widgets){
    this.widgets = widgets;
    
    this.grid = zeros(this.widgets.Nx, this.widgets.Ny);
    this.setBound();
  }
  
  compute(){
    let dx = this.widgets.dx;
    let dy = this.widgets.dy;
    let dt = this.widgets.dt;
    let D = this.widgets.D;
    let alph = D * dt / (dx ** 2);
    let beta = D * dt / (dy ** 2);
    let newgrid = copyMat(this.grid);
    
    for (let i = 1; i < newgrid.length - 1; i++){
      for(let j = 1; j < newgrid[0].length - 1; j++){
          newgrid[i][j] =
          this.grid[i][j] +
          alph * (this.grid[i][j - 1] + this.grid[i][j + 1] - 2 * this.grid[i][j]) +
          beta * (this.grid[i - 1][j] + this.grid[i + 1][j] - 2 * this.grid[i][j]);
      }
    }
    this.grid = newgrid;
    this.setBound();
  }

  setBound() {
    let Ttop = this.widgets.Ttop;
    let Tbot = this.widgets.Tbot;
    let Tright = this.widgets.Tright;
    let Tleft = this.widgets.Tleft;
  
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i][0] = Ttop;
      this.grid[i][this.grid[0].length - 1] = Tbot;
    }
  
    for (let j = 0; j < this.grid[0].length; j++) {
      this.grid[0][j] = Tleft;
      this.grid[this.grid.length - 1][j] = Tright;
    }
  } 

  createQ(distrib){
    let Nx = this.widgets.Nx;
    let Ny = this.widgets.Ny;
    
    
    if (distrib == 'Random'){
      return randMat(Nx, Ny, 0, 1);
    }   
    if (distrib == 'Sinus'){
      return sinMat(Nx, Ny, 1);
    }
    if (distrib == 'Exp'){
      return expMat(Nx, Ny);
    }
    if (distrib == 'None'){
      return zeros(Nx, Ny);
    }
  }
  
  show3D(){
   
    let dx = this.widgets.dx;
    let dy = this.widgets.dy;
    
    for (let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid[0].length; j++){
        
        push();
        let cval = map(this.grid[i][j], findMin(this.grid), findMax(this.grid), 0, 1);
        fill(linearGradient(cval,  color(100, 0, 255), color(255, 0, 0)));
        translate(i*dx, j*dy, this.grid[i][j]/2);
        box(dx, dy, this.grid[i][j]);
        pop();
      }
    } 
  }
}


function linearGradient(val, color1, color2) {

  // Extract individual color components from color1
  var r1 = red(color1);
  var g1 = green(color1);
  var b1 = blue(color1);

  // Extract individual color components from color2
  var r2 = red(color2);
  var g2 = green(color2);
  var b2 = blue(color2);

  // Interpolate the color components based on t
  var r = lerp(r1, r2, val);
  var g = lerp(g1, g2, val);
  var b = lerp(b1, b2, val);

  // Create and return the resulting color
  return color(r, g, b);
}
