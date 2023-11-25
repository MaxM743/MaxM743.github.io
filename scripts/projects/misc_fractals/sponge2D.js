let maximum = 2;
let mouseOverCanvas = false;
let canvas = document.getElementById("fractals-sponge2D");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "white";

function sponge2D(x, y, length, level) {
    if (level === maximum) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, length, length);
    } else {
        const newLength = length / 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!(i === 1 && j === 1)) {
                    sponge2D(x + i * newLength, y + j * newLength, newLength, level + 1);
                }
            }
        }
    }
}
canvas.addEventListener("mouseenter", function() {
  mouseOverCanvas = true;
});

canvas.addEventListener("mouseleave", function() {
  mouseOverCanvas = false;
});

document.addEventListener("click", function() {
    if (mouseOverCanvas && maximum < 6) {
        maximum++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sponge2D(0, 0, canvas.height, 1); // Replace the canvas element
    }
});

sponge2D(0, 0, canvas.height, 1);