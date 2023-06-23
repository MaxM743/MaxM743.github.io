class Complex{
  constructor(re, im){
    this.re = re;
    this.im = im;
  }
  
  getNorm(){
    return sqrt(this.re * this.re + this.im * this.im)
  }
}


function addComplex(c1, c2){
  return new Complex(c1.re + c2.re, c1.im + c2.im)
}

function multComplex(c1, c2){
  return new Complex(c1.re * c2.re - c1.im * c2.im, c1.im * c2.re + c1.re * c2.im)
}
