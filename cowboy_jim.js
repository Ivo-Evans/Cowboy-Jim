const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let jimsDirection = 'up';
let killCount = 0;

let enemies = {
    top: [],
    right: [],
    bottom: [],
    left: []
}

let enemyRate = 0.001 // I think a fun game would involve less enemies running faster
let enemySpeed = 4; // floats are acceptable

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJim();
    drawTown();
    // modulateDifficulty();
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
    ctx.fillText("Score: " + killCount, 8, 20);
}

function drawAmmo() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText(leftCylinder, 550, 20);    
    ctx.fillText(rightCylinder, 550, 40);
}

let interval = setInterval(draw, 10);

/* stuff related to enemies */

function modulateDifficulty() {
    if (killCount % 50 == 0) {
        enemyRate -= 0.002;
        enemySpeed += 0.5;
    } else if (killCount % 10 == 0) {
        enemyRate += 0.001;
    }
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
let forbiddenKeys = [];


document.addEventListener('keydown', logKeys, false);
document.addEventListener('keyup', useKeys, false);

function logKeys(e) {
    let event = e.key.toLowerCase();
    if (forbiddenKeys.includes(event)) {return}
    if (wasdArray.includes(event)) {
       forbiddenKeys.push(...wasdArray);
       currentKeys.push(event);
     } else if (arrowArray.includes(event)) {
       forbiddenKeys.push(...arrowArray);
       currentKeys.push(event); // repeated inside conditionals so that, e.g., 'f' does not cause problems
     }
 }

function useKeys(event) {
    if (event.key.toLowerCase() == 'e') {
        reload('left');
    } else if (event.key == '/') {
        reload('right');
    } else if (currentKeys.includes('a') && (currentKeys.includes('arrowright'))) {
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
    forbiddenKeys = [];
    currentKeys = [];
}

function reload(gun) {
  if (gun == "left") {
      leftCylinder = "reloading";
      setTimeout(() => leftCylinder = 6, 2000)
  } else if (gun == "right") {
      rightCylinder = "reloading";
      setTimeout(() => rightCylinder = 6, 2000)
  } 
  let reload = new Audio('./reload.mp3');
  reload.volume = 0.4;
  reload.play();
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
    let gunSound = new Audio('./gunshot.mp3'); // first few sounds don't play... why?
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
    if (direction == 'arrowup' || direction == 'w') {if (enemies.top.shift() != undefined) {killCount++}} 
    if (direction == 'arrowleft' || direction == 'a') {if (enemies.left.shift() != undefined) {killCount++}} 
    if (direction == 'arrowright' || direction == 'd') {if (enemies.right.shift() != undefined) {killCount++}}   
    if (direction == 'arrowdown' || direction == 's') {if (enemies.bottom.shift() != undefined) {killCount++}} 
    modulateDifficulty();
}

/*
TODO: add up-down trick shot support // THOUGHT: currently, the gun input refers to the absolute position of the shot, it's not relative to Jim's body or direction. That's fine and good, but it means that the trickshot mechanic doesn't make that much sense. When Jim is facing up, 'd' 'ArrowLeft' is a good shot, but when he is facing down, it is a bad shot. You could only make this idea work if: a) Jim never rotates his body (doesn't make sense), b) the trick shot is determined relative to Jim's current rotation (overly impractical and difficult for the player, since control scheme and camera wouldn't rotate). Why don't you just simplify your game, then, and remove this idea, along with the chance variabe etc etc. Or, alternately, just stop him from rotating his body...? A lot would have to be lost to remove the feature, stuff which has been fun. Then again what has it really gotten you? You, yourself, don't even use it in gameplay, it's just a bit confusing. 


TODO: decide on sizing
TODO: refine maths so that, e.g, ninjas run towards Jim's center and don't spawn inside buildings
TODO: add images to make this more fun
TODO: add difficulty incrementing
TODO: redesign this as a modular program. Modules: main, ninjas, combat or shooting. Each should import all from the others, importing as an object like Ninjas.generateEnemies() inside main.js and Main.ctx inside ninjas.js.
TODO: double points for using both guns at once to kill two enemies (implementation: a killcount and a bonus count feature, which are combined in the score display. Increment difficulty based on kill count, but not on score count)
*/