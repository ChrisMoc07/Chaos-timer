const canvas = document.getElementById("clockCanvas")
const ctx = canvas.getContext("2d");
const radius = (canvas.width)/2;

function drawClock() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx. translate(radius, radius);
    drawFace();
    drawNumbers();
    drawHands();
    ctx.translate(-radius,-radius);
}

function drawFace(){
    ctx.beginPath();
    ctx.arc(0, 0, radius -10, 0, 2 * Math.PI);
    ctx.fillStyle = "White";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,0,5,0,2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    }

function drawNumber() {
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for(let i = 1; i <= 12; i++) {
        let angle = (num * Math.PI)/6;
        let x = Math.cos(angle) * (radius -40);
        let y = Math.sin(angle) * (radius -40);
        ctx.fillText(num, x, y);
    }
}

function updateClock() {
    ctx.beginPath();
    ctx.linewidth = width;
    ctx.style = color;
    ctx.moveTo(0,0);
    ctx.lineTo(length * Math.cos((angle -90) * (Math.PI / 180))), (length * Math.sin((angle-90) * (Math.PI / 180)));
    ctx.stroke();
}

function updateClock() {
   ctx.setTransform(1,0,0,1,0,0);
   drawClock();
   requestAnimationFrame(updateClock);
}

updateClock()
