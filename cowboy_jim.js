const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let jimsDirection = 'up';
let score = 0;
let rightCylinder = 6;
let enemies = {
    top: [],
    right: [],
    bottom: [],
    left: []
}
let enemyRate = 0.005;

document.addEventListener('keyup', shoot) // multiple keystrokes: while keydown, given key is true. If at time of keyup the other key is held down, this will be registered as a double-press ?? 

function shoot(event) {
   if (event.key == 'ArrowUp') {if (enemies.top.shift() != undefined) {score++}} 
   if (event.key == 'ArrowDown') {if (enemies.bottom.shift() != undefined) {score++}} 
   if (event.key == 'ArrowLeft') {if (enemies.left.shift() != undefined) {score++}} 
   if (event.key == 'ArrowRight') {if (enemies.right.shift() != undefined) {score++}} 
   event.prevetDefault();
 
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJim(jimsDirection);
    drawBuildings();
    generateEnemies();
    drawEnemies();
    drawScore();
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
    ctx.closePath();
}

function generateEnemies() {
   let chance = Math.random();
   let thisNinja = makeNinjaStartPosition();
   if (chance < enemyRate / 4) {
    enemies.left.push({x: 0, y: thisNinja[0], sidestep: thisNinja[1]}) 
   } else if (chance < enemyRate / 2) {
    enemies.top.push({x: thisNinja[0], y: 0, sidestep: thisNinja[1]})
   } else if (chance < enemyRate / 4 * 3) {
    enemies.right.push({x: 650, y: thisNinja[0], sidestep: thisNinja[1]})
   } else if (chance < enemyRate) {
    enemies.bottom.push({x: thisNinja[0], y: 650,  sidestep: thisNinja[1]})
   }
}

function makeNinjaStartPosition() {
    let lateralPosition = 200 + Math.round(Math.random() * 250);
    let sideStepfactor = (325 - lateralPosition) / 325;
    return [lateralPosition, sideStepfactor];
}
// y, and in fact every 325 here: random place between 200 and 450. Then calculate the total positive or negative distance of y + 200 from 325, divide that by 300 (the x distance of Jim from the edge), and assign result as transform (a prop). Every iteration -= transform to y in drawEnemies().


function drawEnemies() {
    enemies.left.forEach(enemy => {
        renderNinja(enemy);
        enemy.x++
        enemy.y += enemy.sidestep;
        // gameover conditions, gameover state
    })

    enemies.top.forEach(enemy => {
        renderNinja(enemy);
        enemy.y++;
        enemy.x += enemy.sidestep;
    })
    
    enemies.bottom.forEach(enemy => {
        renderNinja(enemy);
        enemy.y--;
        enemy.x += enemy.sidestep;
    })

    enemies.right.forEach(enemy => {
        renderNinja(enemy);
        enemy.x--;
        enemy.y += enemy.sidestep;
    })
}

function renderNinja(ninja) {
    ctx.beginPath()
    ctx.rect(ninja.x, ninja.y, 30, 30)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 8, 20);
}

let interval = setInterval(draw, 1);



/*
TODO: score count
TODO: decide on sizing
TODO: refine maths so that, e.g, ninjas run towards Jim's center and don't spawn inside buildings
TODO: implement reload feature
TODO: sound effects
TODO: background images



*/