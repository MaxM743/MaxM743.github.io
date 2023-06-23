class Axis{
  constructor(p){
  
  }
  
  show(){
    let weights = [1, 1, 1];
    if (keyIsPressed){
      if (keyCode == 65){
        weights[0] = 4;
      }
      else if (keyCode == 90){
        weights[1] = 4;
      }
      else if (keyCode == 69){
        weights[2] = 4;
      }
    }else{
      weights = [1, 1, 1];
    }

      push()
      strokeWeight(weights[0]);
      stroke('red');
      line(-width, 0, 0, width, 0, 0);
      pop()
      push()
      strokeWeight(weights[1]);
      stroke('green');
      line(0, -height, 0, 0, height, 0);
      pop()
      push()
      strokeWeight(weights[2]);
      stroke('blue');
      line(0, 0, -height, 0, 0, height);
      pop()
  }
  
  
}

