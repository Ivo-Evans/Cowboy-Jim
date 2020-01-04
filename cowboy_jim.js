const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let jimsDirection = 'up';

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJim(jimsDirection);
    drawBuildings();
}

function drawJim(direction) {
   ctx.beginPath();
   ctx.rect(300, 300, 50, 50); // start start span span
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath(); 
}

function drawBuildings() {
  drawBuilding(0, 0);
  drawBuilding(canvas.width - 200, 0);
  drawBuilding(0, canvas.height - 200);
  drawBuilding(canvas.width - 200, canvas.height - 200);  
}

function drawBuilding(x, y) {
    ctx.beginPath()
    ctx.rect(x, y, 200, 200);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath;
}



let interval = setInterval(draw, 5);