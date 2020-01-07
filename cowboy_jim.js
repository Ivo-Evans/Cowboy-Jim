const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let jimsDirection = 'up';
let score = 0;

let enemies = {
    top: [],
    right: [],
    bottom: [],
    left: []
}

let enemyRate = 0.01 // I think a fun game would involve less enemies running faster
let enemySpeed = 2; // floats are acceptable

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJim();
    drawTown();
    generateEnemies();
    drawEnemies();
    drawScore();
    drawAmmo()
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

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawAmmo() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText(leftCylinder, 550, 20);    
    ctx.fillText(rightCylinder, 550, 40);
}

let interval = setInterval(draw, 10);

/* stuff related to enemies */
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
    
    enemies.right.forEach(enemy => {
        renderNinja(enemy);
        enemy.x -= enemySpeed;
        enemy.y += enemy.sidestep * enemySpeed;
    })

    enemies.bottom.forEach(enemy => {
        renderNinja(enemy);
        enemy.y -= enemySpeed;
        enemy.x += enemy.sidestep * enemySpeed;
    })
}

function renderNinja(ninja) {
    ctx.beginPath()
    ctx.rect(ninja.x, ninja.y, 30, 30)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}


/* shooting mechanics */

let leftCylinder = 6;
let rightCylinder = 6;
let arrowArray = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright']
let wasdArray = ['w', 'a', 's', 'd']
let currentKeys = [] 

document.addEventListener('keydown', logKeys, false);
document.addEventListener('keyup', useKeys, false);

function logKeys(e) {
    let event = e.key.toLowerCase();
    if (arrowArray.includes(event)) {duplicateControl(event, arrowArray)}
    if (wasdArray.includes(event)) {duplicateControl(event, wasdArray)}
}

function duplicateControl(input, checkAgainst) { // perhaps you could reduce time complexity by adding a forbiddenKeys array and only pushing if it's not in the forbidden keys array. Then clear forbiddenKeys at the same time as currentKeys
  let key; // you have to actually declare this variable. Weird eh.
  for(key of checkAgainst) {
      if (currentKeys.includes(key)) {return}
  }
  currentKeys.push(input);
}

function useKeys(event) {
    if (event.key.toLowerCase() == 'e') {
        reload('left');
    } else if (event.key == '/') {
        reload('right');
    }else if (currentKeys.includes('a') && (currentKeys.includes('arrowright'))) {
        checkCylinders('left', 'a', 0.5)
        checkCylinders('right', 'arrowright', 0.5)
    } else if (currentKeys.length > 1) {
        checkCylinders('right', currentKeys[0]);
        checkCylinders('left', currentKeys[1]);
    } else {
        if (arrowArray.includes(currentKeys[0])) {
            checkCylinders('right', currentKeys[0])
        } else if (wasdArray.includes(currentKeys[0])) {
            checkCylinders('left', currentKeys[0])
        }
    }
  
    currentKeys = []
}

function reload(gun) {
  if (gun == "left") {
      leftCylinder = "reloading";
      setTimeout(() => leftCylinder = 6, 2000)
  } else if (gun == "right") {
      rightCylinder = "reloading";
      setTimeout(() => rightCylinder = 6, 2000)
  } 
}

function checkCylinders(gun, direction, chance) {
    if (gun == 'right') {
        if (rightCylinder > 0) {
            fireShots(direction, chance);
            rightCylinder--;
            if (rightCylinder < 1) {reload(gun)}
        }
    } else {
        if (leftCylinder > 0) {
            fireShots(direction, chance);
            leftCylinder--;
            if (leftCylinder < 1) {reload(gun)}
        }
    }
}

function fireShots(direction, chance) {
    let gunSound = new Audio('./Gunshot sound.mp3'); // first few sounds don't play... why?
    gunSound.volume = 0.5;
    gunSound.play();  
    if (chance) {
        if (Math.random() > chance) {
            killNinjas(direction);
        }
    } else {
        killNinjas(direction);
    }
}

function killNinjas(direction) {
    if (direction == 'arrowup' || direction == 'w') {if (enemies.top.shift() != undefined) {score++}} 
    if (direction == 'arrowleft' || direction == 'a') {if (enemies.left.shift() != undefined) {score++}} 
    if (direction == 'arrowright' || direction == 'd') {if (enemies.right.shift() != undefined) {score++}}   
    if (direction == 'arrowdown' || direction == 's') {if (enemies.bottom.shift() != undefined) {score++}} 
}

/*
TODO: add up-down trick shot support
TODO: decide on sizing
TODO: refine maths so that, e.g, ninjas run towards Jim's center and don't spawn inside buildings
TODO: add images to make this more fun
TODO: implement gun reload feature
TODO: add reload sound
TODO: add difficulty incrementing
TODO: redesign this as a modular program. Modules: main, ninjas, combat or shooting. Each should import all from the others, importing as an object like Ninjas.generateEnemies() inside main.js and Main.ctx inside ninjas.js.
*/