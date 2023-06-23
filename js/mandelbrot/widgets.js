class Widgets{
  constructor(){
    this.selectIterations = new iterationSelector();
    
    this.buttonReset = createButton('Reset');
    this.buttonBack = createButton('Return');
    this.buttonReset.style('color: white;')
    this.buttonBack.style('color: white;')


    this.buttonReset.mousePressed(this.resetB);
    this.buttonBack.mousePressed(() => this.backB());

    this.buttonReset.parent('p5-widgets');
    this.buttonBack.parent('p5-widgets');

    this.divRes = createP('Resolution:');
    this.sliderRes = createSlider(4, 100, 10);
    
    this.divRes.parent('p5-widgets');
    this.sliderRes.parent('p5-widgets');
    
    
    
  }
  update(){
    //maxIterations = this.sliderIterations.value();
    if (resolution != this.sliderRes.value()){
      resolution = this.sliderRes.value();
      py = 0;
    }
    if (this.selectIterations.getValue() !== maxIterations){
      maxIterations = this.selectIterations.getValue();
      history.push({xb:history[history.length - 1].xb, yb:history[history.length - 1].yb, iter:maxIterations});
      
      py = 0;
    }
  }
  
  backB(){
    print('a')
    if (history.length > 1){
      history.splice(history.length - 1);
      this.selectIterations.setValue()
      py = 0;
    }
  }
  resetB(){
    while (history.length > 1){
      history.splice(history.length - 1);
      py = 0;
    }
  }
  
}


class iterationSelector{
  constructor(){
    this.thousand = createSelect();
    this.hundred = createSelect();
    this.ten = createSelect();
    this.one = createSelect();

    this.thousand.parent('p5-widgets');
    this.hundred.parent('p5-widgets');
    this.ten.parent('p5-widgets');
    this.one.parent('p5-widgets');
    
    for (let i = 0; i < 10; i++){
      this.thousand.option(str(i));
      this.hundred.option(str(i));
      this.ten.option(str(i));
      this.one.option(str(i));
    }
    this.ten.selected('2');
  }
  
  getValue(){
    return int(this.thousand.value()
               +this.hundred.value()
               +this.ten.value()
               +this.one.value())
  }

  setValue(){
    let string = str(history[history.length - 1].iter);
    print(string)
    while (string.length < 4){
      string = "0" + string;
    }
    print(string)
    this.thousand.selected(string[0]);
    this.hundred.selected(string[1]);
    this.ten.selected(string[2]);
    this.one.selected(string[3]);
  }
}