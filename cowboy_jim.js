const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let jimsDirection = 'up';
let score = 0;
let rightCylinder = 6;
let leftCylinder = 6;

let enemies = {
    top: [],
    right: [],
    bottom: [],
    left: []
}
let enemyRate = 0.01 
let enemySpeed = 2; // floats are acceptable

const acceptedKeys =['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D']
let kPress = [] // current keys. Shortened because of its use in useKeys()


document.addEventListener('keydown', logKeys, false);
document.addEventListener('keyup', useKeys, false);


function logKeys(e) {
    if (kPress.includes(e.key.toLowerCase())) {return}
    if (acceptedKeys.includes(e.key)) {kPress.push(e.key.toLowerCase())}
}

function useKeys() {
    if (kPress.includes('a') && kPress.includes('arrowright')) {
        Math.random() > 0.5 ? kill('a') : shotsFired();
        Math.random() > 0.5 ? kill('ArrowRight') : shotsFired();
    } else if ((kPress.includes('w') || kPress.includes('a') || kPress.includes('s') || kPress.includes('d')) && (kPress.includes('arrowup') || kPress.includes('arrowleft') || kPress.includes('arrowdown') || kPress.includes('arrowright'))) {
        kill(kPress[0])
        kill(kPress[1]) // this won't be perfectly reliable if the user presses three buttons...
    } else {
        kill(kPress[0])
    }
    kPress = [];
}

function shotsFired() {
    let gunSound = new Audio('./Gunshot sound.wav');
    gunSound.play();    
    // also add an ammo decreaser which is conditional on the flag given as a parameter - left or right
}

function kill(key) {
    if (key == 'arrowup' || key == 'w') {if (enemies.top.shift() != undefined) {score++}} 
    if (key == 'arrowleft' || key == 'a') {if (enemies.left.shift() != undefined) {score++}} 
    if (key == 'arrowright' || key == 'd') {if (enemies.right.shift() != undefined) {score++}}   
    if (key == 'arrowdown' || key == 's') {if (enemies.bottom.shift() != undefined) {score++}} 
    shotsFired();
    event.preventDefault(); // TODO: make this work
 }
 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJim();
    drawTown();
    generateEnemies();
    drawEnemies();
    drawScore();
}

function drawJim() {
   ctx.beginPath();
   ctx.rect(300, 300, 30, 30); // start start span span
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath(); 
}

function drawTown() {
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

function drawEnemies() {
    enemies.left.forEach(enemy => {
        renderNinja(enemy);
        enemy.x += enemySpeed;
        enemy.y += enemy.sidestep * enemySpeed;
        // gameover conditions, gameover state
    })

    enemies.top.forEach(enemy => {
        renderNinja(enemy);
        enemy.y += enemySpeed;
        enemy.x += enemy.sidestep * enemySpeed;
    })
    
    enemies.bottom.forEach(enemy => {
        renderNinja(enemy);
        enemy.y -= enemySpeed;
        enemy.x += enemy.sidestep * enemySpeed;
    })

    enemies.right.forEach(enemy => {
        renderNinja(enemy);
        enemy.x -= enemySpeed;
        enemy.y += enemy.sidestep * enemySpeed;
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

let interval = setInterval(draw, 10);


/*
TODO: decide on sizing
TODO: refine maths so that, e.g, ninjas run towards Jim's center and don't spawn inside buildings
TODO: implement gun reload feature
TODO: add reload sound
*/


