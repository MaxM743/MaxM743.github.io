
// draw a sierpinski triangle from x, y with length length and level level  (level = 1, 2, 3, ...) 
function sierpinski(x, y, length, level, maximum) {
  if (level == Math.floor(maximum)) {
    triangle(x, y, length);
  } else {
    sierpinski(x, y, length / 2, level + 1, maximum);
    sierpinski(x + length / 2, y, length / 2, level + 1, maximum);
    sierpinski(x + length / 4, y - (length * Math.sqrt(3)) / 4, length / 2, level + 1, maximum);
  }
}
//draw a triangle from x, y with length length
function triangle(x, y, length) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + length / 2, y - (length * Math.sqrt(3)) / 2);
  ctx.lineTo(x + length, y);
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.stroke();
}
// map a value from a range to another range
function main_sierp(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    if (mouseover2){
      
      let rect = cnv.getBoundingClientRect();
      max_deep = Math.min(map(mouseX2, rect.left, rect.left+width, 2, 5), 6);
      
    }
    sierpinski(height/2, height, height, 1, max_deep)
    setTimeout(function () { main_sierp();}, 100);
}




const cnv = document.getElementById("fractals-sierpinski");
const ctx = cnv.getContext('2d');
var vw = window.innerWidth;  // Get viewport width
var vh = window.innerHeight; // Get viewport height

// Set canvas width and height to 50% of viewport dimensions
cnv.width = vw * 0.6;
cnv.height = vh * 0.7;


// Add an event listener to resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);
let mouseX2, mouseY2 = 0;
let max_deep = 1;

let mouseover2 = false;
//event handler for mouse over canvas
cnv.addEventListener('mouseover', function(event) {
    mouseover2 = true;
}, false);
//event handler for mouse out canvas
cnv.addEventListener('mouseout', function(event) {
    mouseover2 = false;
    max_deep = 2;
}, false);

cnv.addEventListener('mousemove', function(event) {
    let rect = cnv.getBoundingClientRect(); 
    if (mouseover2){
        mouseX2 = event.clientX - rect.left;
        mouseY2 = event.clientY - rect.top;
    }
}, false);

main_sierp();