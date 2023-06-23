class Widgets {
    constructor(){
        this.run = 2;
        this.Nx = 1;
        this.Ny = 1;
        this.Ti = 10;
        this.Ttop = 1;
        this.Tbot = 1;
        this.Tleft = 1;
        this.Tright = 1;
        this.D = 1;
        this.dx = width / this.Nx;
        this.dy = height / this.Ny;
        this.dt = 1 / (4 * this.D) * (this.dx ** 2 * this.dy ** 2) / (this.dx ** 2 + this.dy ** 2);

        this.divNx = createDiv("Nx");
        this.sliderNx = createSlider(5, 30, 10);
        this.divNy = createDiv("Ny");
        this.sliderNy = createSlider(5, 30, 10);


        this.divNx.parent("p5-widgets");
        this.sliderNx.parent("p5-widgets");
        this.divNy.parent("p5-widgets");
        this.sliderNy.parent("p5-widgets");
        
        this.divTtop = createDiv("Ttop");
        this.sliderTtop = createSlider(0, 200, 20);
        this.divTbot = createDiv("Tbot");
        this.sliderTbot = createSlider(0, 200, 20);
        this.divTleft = createDiv("Tleft");
        this.sliderTleft = createSlider(0, 200, 20);
        this.divTright = createDiv("Tright");
        this.sliderTright = createSlider(0, 200, 20);
        this.divD = createDiv("D");
        this.sliderD = createSlider(1, 200, 10);
        

        
        this.divTtop.parent("p5-widgets");
        this.sliderTtop.parent("p5-widgets");
        this.divTbot.parent("p5-widgets");
        this.sliderTbot.parent("p5-widgets");
        this.divTleft.parent("p5-widgets");
        this.sliderTleft.parent("p5-widgets");
        this.divTright.parent("p5-widgets");
        this.sliderTright.parent("p5-widgets");
        this.divD.parent("p5-widgets");
        this.sliderD.parent("p5-widgets");
        

        this.buttonRun = createButton('Run');
        this.buttonRun.style("color: white;")
        this.buttonReset = createButton('Reset');
        this.buttonReset.style("color: white;")


        this.buttonReset.mousePressed(() => {this.run = 2}); 
        this.buttonRun.mousePressed(() => {this.run = (this.run + 1)%2}); 
  
        this.buttonRun.parent("p5-widgets");
        this.buttonReset.parent("p5-widgets");

        this.update();

    }

    update() {
        this.Nx = this.sliderNx.value();
        this.Ny = this.sliderNy.value();
        this.Ttop = this.sliderTtop.value();
        this.Tbot = this.sliderTbot.value();
        this.Tleft = this.sliderTleft.value();
        this.Tright = this.sliderTright.value();
        this.D = this.sliderD.value();
        this.dx = width / this.Nx;
        this.dy = height / this.Ny;
        this.dt = 1 / (4 * this.D) * (this.dx ** 2 * this.dy ** 2) / (this.dx ** 2 + this.dy ** 2);
    }



}