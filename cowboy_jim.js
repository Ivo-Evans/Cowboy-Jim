const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let jimsDirection = 'up';
let enemies = {
    top: [],
    right: [],
    bottom: [],
    left: []
}
let enemyRate = 0.002;


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJim(jimsDirection);
    drawBuildings();
    generateEnemies();
    drawEnemies();
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

function generateEnemies() {
   let chance = Math.random();
   if (chance < enemyRate / 4) {
    enemies.left.push({x: 0, y: 325})
   } else if (chance < enemyRate / 2) {
    enemies.top.push({x: 325, y: 0})
   } else if (chance < enemyRate / 4 * 3) {
    enemies.right.push({x: 650, y: 325})
   } else if (chance < enemyRate) {
    enemies.bottom.push({x: 325, y: 650})
   }
}

function drawEnemies() {
    enemies.left.forEach(enemy => {
        renderNinja(enemy);
        enemy.x++
    })

    enemies.top.forEach(enemy => {
        renderNinja(enemy);
        enemy.y++;
    })
    
    enemies.bottom.forEach(enemy => {
        renderNinja(enemy);
        enemy.y--;
    })

    enemies.right.forEach(enemy => {
        renderNinja(enemy);
        enemy.x--;
    })
}

function renderNinja(ninja) {
    ctx.beginPath()
    ctx.rect(ninja.x, ninja.y, 30, 30)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

let interval = setInterval(draw, 5);