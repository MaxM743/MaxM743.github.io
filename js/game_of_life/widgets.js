class Widgets{
    constructor(){
      
      
      this.buttonStart = createButton("Start");
      this.buttonReset = createButton("Clear");
      this.buttonRandom = createButton('Random');

      this.divSpeed = createP("Speed:");
      this.sliderSpeed = createSlider(30, 99, 70);
      this.divNx = createP("Nx:");
      this.sliderNx = createSlider(10, 100, 40);
      this.divNy = createP("Ny:");
      this.sliderNy = createSlider(10, 100, 40);

      this.buttonStart.mousePressed(() => run = (run+1)%2);
      this.buttonReset.mousePressed(this.reset);
      this.buttonRandom.mousePressed(() => game.grid = createRandomGrid());

      this.buttonStart.parent("p5-widgets");
      this.buttonReset.parent("p5-widgets");
      this.buttonRandom.parent("p5-widgets");
      this.divSpeed.parent("p5-widgets");
      this.sliderSpeed.parent("p5-widgets");
      this.divNx.parent("p5-widgets");
      this.sliderNx.parent("p5-widgets");
      this.divNy.parent("p5-widgets");
      this.sliderNy.parent("p5-widgets");


      this.buttonStart.style("color: white;");
      this.buttonReset.style("color: white;");
      this.buttonRandom.style("color: white;");


    }
    update(){
      if (game.Nx != this.sliderNx.value()){
        game.Nx = this.sliderNx.value();
        game.newGrid();
      }
      if (game.Ny != this.sliderNy.value()){
        game.Ny = this.sliderNy.value();
        game.newGrid();
      }
      
    }

    reset(){
      game.newGrid();
      run = 0;
    }

    changeColSize(){
        if (this.value() > 1 && typeof(int(this.value())) == "number"){
            game.Nx = int(this.value());
            game.grid = game.createGrid();
        }
    }
    changeLineSize(){
        if (this.value() > 1 && typeof(int(this.value())) == "number"){
            game.grid = game.createGrid();
        }
    }

  }

function createRandomGrid(){
    let grid = [];
    for (let i = 0; i < game.Nx; i++) {
        let line_ = [];
        for (let j = 0; j < game.Ny; j++) {
          if (random(0, 1) < 0.5){
            line_.push(int(random(0, 2)));
          }
          else{line_.push(0)}
        }
        grid.push(line_);
      }
    return grid
}