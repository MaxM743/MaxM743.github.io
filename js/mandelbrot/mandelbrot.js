let maxIterations = 20;
let resolution;

let xbounds = [-2, 1];
let ybounds = [-1, 1];

let history = [{xb:xbounds, yb:ybounds, iter:maxIterations}];

let py = 0;

let zoom;
let widgets;



function setup() {
  let canvas = createCanvas(int(0.9*windowHeight), int(0.9*windowHeight));
  canvas.parent('p5-sketch');
  pixelDensity(1);

  zoom = new Zoom();
  widgets = new Widgets();
}

function draw() {
  widgets.update();

  if (py < height) {
    
    loadPixels();
    
    for (let sub_py = 0; sub_py < 100; sub_py++) {
      for (let px = 0; px < width; px++) {
        
        let n = 0;
        let c_re = map(px, 0, width, history[history.length - 1].xb[0], history[history.length - 1].xb[1]);
        let c_im = map(py, 0, height, history[history.length - 1].yb[0], history[history.length - 1].yb[1]);
        let c = new Complex(c_re, c_im);
        let z = new Complex(0, 0);

        while (z.getNorm() <= resolution && n < history[history.length - 1].iter) {
          let new_re = z.re * z.re - z.im * z.im + c.re;
          let new_im = 2 * z.re * z.im + c.im;
          z = new Complex(new_re, new_im);
          n += 1;
        }

        let index = (px + py * width) * 4;
        let col = getColor(n);
        pixels[index] = red(col);
        pixels[index + 1] = green(col);
        pixels[index + 2] = blue(col);
        pixels[index + 3] = 255;
        
      }
      py += 1;
    }  
    updatePixels();
  }
}

function getColor(iterations) {
  if (iterations === history[history.length - 1].iter) {
    return color(0, 0, 0);
  } else {

    let potential = map(iterations, 0, history[history.length - 1].iter, 0, 1);
    

    let colorGradient = [
      { pos: 0.0, color: color(0, 0, 0) },   // Black
      { pos: 0.2, color: color(255, 0, 0) }, // Red
      { pos: 0.4, color: color(255, 255, 0) }, // Yellow
      { pos: 0.6, color: color(0, 255, 0) }, // Green
      { pos: 0.8, color: color(0, 0, 255) }, // Blue
      { pos: 1.0, color: color(255, 255, 255) } // White
    ];
 
    let colorIndex = 0;
    while (colorGradient[colorIndex + 1].pos < potential) {
      colorIndex++;
    }
    
    let startColor = colorGradient[colorIndex].color;
    let endColor = colorGradient[colorIndex + 1].color;
    let startPos = colorGradient[colorIndex].pos;
    let endPos = colorGradient[colorIndex + 1].pos;
    
  
    let t = map(potential, startPos, endPos, 0, 1);
    let col = lerpColor(startColor, endColor, t);
    
    return col;
  }
}

function windowResized() {
  resizeCanvas(int(0.9*windowHeight), int(0.9*windowHeight));
  py = 0;
}