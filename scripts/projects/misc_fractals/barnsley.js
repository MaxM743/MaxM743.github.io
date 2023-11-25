
// function to generate the next point in the Barnsley fern
function barnsley() {
    let r = Math.random();
    let next_x = 0;
    let next_y = 0;
  
    if (r < 0.01) {
      next_x = 0.0;
      next_y = y * 0.16;
    } else if (r < 0.86) {
      next_x = 0.85 * x + 0.04 * y;
      next_y = -0.04 * x + 0.85 * y + 1.6;
    } else if (r < 0.93) {
      next_x = 0.2 * x - 0.26 * y;
      next_y = 0.23 * x + 0.22 * y + 1.6;
    } else {
      next_x = -0.15 * x + 0.22 * y;
      next_y = 0.26 * x + 0.24 * y + 0.44;
    }
  
    x = next_x;
    y = next_y;
  }

// function to map a value x from range [a, b] to range [c, d]
function map(x, a, b, c, d) {
    return (x - a) / (b - a) * (d - c) + c;
}

//function to show the point
function show(){  
    let x_d = map(x, -2.1820, 2.6558, 10, width-10);
    let y_d = map(y, 0, 9.9983, height-10, 10);
    context.beginPath();
    context.arc(x_d, y_d, 1, 0, 2 * Math.PI, true);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
}

function main_barn(){
    if (mouseover){
        let count = map(mouseX, 0, 10*width, 0, 50);
        for (let i = 0; i < count; i++) {
            barnsley();
            show();
        }
    }
    setTimeout(function () { main_barn();}, 10);
}


const canvas = document.getElementById('fractals-barnsley');
const context = canvas.getContext('2d');
var vw = window.innerWidth;  // Get viewport width
var vh = window.innerHeight; // Get viewport height

// Set canvas width and height to 50% of viewport dimensions
canvas.width = vw * 0.6;
canvas.height = vh * 0.7;


// Add an event listener to resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);


const width = canvas.width;
const height = canvas.height;
let x = 0;
let y = 0;
let mouseX, mouseY = 0;

//event handler for mouse in canvas
canvas.addEventListener('mousemove', function(event) { 
    let rect = canvas.getBoundingClientRect(); 
    if (mouseover){
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    }
}, false);

//create a variable mouseover which is true if the mouse is over the canvas and false either
let mouseover = false;
//event handler for mouse over canvas
canvas.addEventListener('mouseover', function(event) {
    mouseover = true;
}, false);
//event handler for mouse out canvas
canvas.addEventListener('mouseout', function(event) {
    mouseover = false;
}, false);





main_barn();




