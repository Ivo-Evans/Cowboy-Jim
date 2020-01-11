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

let enemyRate = 0.01 // I think a fun game would involve less enemies running faster
let enemySpeed = 4; // floats are acceptable

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJim();
    drawTown();
    generateEnemies();
    drawEnemies();
    drawScore();
    drawAmmo();
}

function drawJim() {
   ctx.beginPath();
   ctx.rect(310, 310, 30, 30); // start start span span
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
    ctx.fillStyle = "#303030";
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
    let lateralPosition = 200 + Math.round(Math.random() * 220); // 220 because the canvas is 650 px, the buildings are 200px (leaving 250 px in the middle) and the ninjas are 30px
    let sideStepfactor = (325 - lateralPosition) / 325;
    return [lateralPosition, sideStepfactor];
}

function drawEnemies() {
    enemies.left.forEach(enemy => {
        renderNinja(enemy);
        enemy.x += enemySpeed;
        enemy.y += enemy.sidestep * enemySpeed;
        if (enemy.x > 300) {
            killNinjas('arrowleft', true);
        }
        // gameover conditions, gameover state
    })

    enemies.top.forEach(enemy => {
        renderNinja(enemy);
        enemy.y += enemySpeed;
        enemy.x += enemy.sidestep * enemySpeed;
        if (enemy.y > 300) {
            killNinjas('arrowup', true);
        }
    })
    
    enemies.right.forEach(enemy => {
        renderNinja(enemy);
        enemy.x -= enemySpeed;
        enemy.y += enemy.sidestep * enemySpeed;
        if (enemy.x < 300) {
            killNinjas('arrowright', true);
        }
    })

    enemies.bottom.forEach(enemy => {
        renderNinja(enemy);
        enemy.y -= enemySpeed;
        enemy.x += enemy.sidestep * enemySpeed;
        if (enemy.y < 300) {
            killNinjas('arrowdown', true);
        }
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
    if (leftCylinder < 6 && event.key.toLowerCase() == 'e') {
        reload('left');
    } else if (rightCylinder < 6 && event.key == '/') {
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

// function reload(cylinder) { //TODO: this
//     cylinder = 'reloading 2';
//     setTimeout(() => cylinder = 6, 2000)
//     let reload = new Audio('./reload.mp3');
//     reload.volume = 0.4;
//     reload.play();    
// }

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

function killNinjas(direction, test) {
    if (direction == 'arrowup' || direction == 'w') {if (enemies.top.shift() != undefined) {killCount++}} 
    if (direction == 'arrowleft' || direction == 'a') {if (enemies.left.shift() != undefined) {killCount++}} 
    if (direction == 'arrowright' || direction == 'd') {if (enemies.right.shift() != undefined) {killCount++}}   
    if (direction == 'arrowdown' || direction == 's') {if (enemies.bottom.shift() != undefined) {killCount++}} 
    if (test == false) {
        modulateDifficulty();
    }
    // modulateDifficulty();
}

/*TODO: add up-down trick shot support // THOUGHT: currently, the gun input refers to the absolute position of the shot, it's not relative to Jim's body or direction. That's fine and good, but it means that the trickshot mechanic doesn't make that much sense. When Jim is facing up, 'd' 'ArrowLeft' is a good shot, but when he is facing down, it is a bad shot. You could only make this idea work if: a) Jim never rotates his body (doesn't make sense), b) the trick shot is determined relative to Jim's current rotation (overly impractical and difficult for the player, since control scheme and camera wouldn't rotate). Why don't you just simplify your game, then, and remove this idea, along with the chance variabe etc etc. Or, alternately, just stop him from rotating his body...? A lot would have to be lost to remove the feature, stuff which has been fun. Then again what has it really gotten you? You, yourself, don't even use it in gameplay, it's just a bit confusing. 
... Maybe it doesn't NEED to make sense. It's a control-scheme dynamic, really - it's there to push player's not to make the most obvious move...
... but maybe it should engender a less bad accuracy reduction, like down to 80% or something, so that it doesn't scare players away from even trying. 


TODO: add images to make this more fun
TODO: redesign this as a modular program. Modules: main, ninjas, combat or shooting. Each should import all from the others, importing as an object like Ninjas.generateEnemies() inside main.js and Main.ctx inside ninjas.js.
TODO: double points for using both guns at once to kill two enemies (implementation: a killcount and a bonus count feature, which are combined in the score display. Increment difficulty based on kill count, but not on score count)
TODO: reload time and sounds are sensitive to capacity - a loop. Something like:
    cylinder = gun == 'left ? : leftCylinder : rightCylinder
    if (cylinder < 6) {
        while (cylinder < 7) {
            // cylinder++
            // play bullet-adding sound once
            // maybe wait for the time it takes - but a blocking method like Ruby's sleep would block the entire program....
        }
        // play final sound
    }
    // actually this is an interesting puzzle, because the best way to do this might be to use setTimeout and recursion... but then how do you play the confirmatory click if and only if the cylinder has been incremented from n..6 ?
    Actually there's a really good answer in this Stack Overflow question. It's the second answer.
    https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
    So you could say:
    if cylinder < 6 {
            for(let i = 1; i < 6 - cylinder; i++) {
                setTimeout(() => {
                    cylinder++
                    // play sound
                }, i * 390) // this is the timeout. As soon as the method is called, i will increment however many times the sound needs to be played, and straight away, it will send out that many timeouts, each separated by however many milliseconds you supply, since they will all be multiplied by i. As each one returns the ammo will increment
    }
    // play the other sound
    }

TODO: maybe enemy number decrease on % 50 should be greater - round about score 100 this game gets really difficult
TODO: a popup allerting you to your level up, like a speech bubble across one of the buildings or something
TODO: remove test crutch from killNinjas, implement real gameover condition
*/