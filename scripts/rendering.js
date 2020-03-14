const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const canvasSize = canvas.offsetWidth;
const canvasMiddle = canvasSize / 2;
const buildingSize = 200;
const buildingOffset = canvasSize - buildingSize;
const buildingGap = buildingOffset - buildingSize;
const ninjaSize = 30;
const ninjaAnimationSpeedReduction = 1 / 5; // a higher divisor lowers the speed at which ninjas move their legs
const gameoverXOffset = 100;
const gameoverYOffset = 180;
const gameoverWidth = canvasSize - gameoverXOffset * 2; // maybe it would be better to define the span absolutely and the offset relatively,so that if you resize the canvas the gameover screen won't grow.
const gameoverHeight = canvasSize - gameoverYOffset * 2;

const jimWidth = 24;
const jimHeight = 33; // note that the image itself is 16 x 22 - these scale it up
const jimOffsetTop = (canvasSize - jimHeight) / 2;
const jimOffsetLeft = (canvasSize - jimHeight) / 2;

let jimsDirection;
let killCount;
let gameover;
let enemies;
let leftCylinder;
let rightCylinder;
let enemyRate;
let enemySpeed;
let interval;

startGame();
requestAnimationFrame(draw);

function startGame() {
  gameover = false;
  jimsDirection = "arrowup";
  killCount = 0;

  enemies = { top: [], right: [], bottom: [], left: [] };

  leftCylinder = {
    bullets: 6,
    cycle: 0,
    reloading: false
  };

  rightCylinder = {
    bullets: 6,
    cycle: 0,
    reloading: false
  }; // maybe you could replace the bool with a mod test for even or odd on cycle (and increment cycle at the beginning and end of a reload cycle). I mean there's no particular reason for this other than to make yourself look clever but still lol. You never know it might shave a single microsecond.

  enemyRate = 0.004; // I think a fun game would involve less enemies running faster
  enemySpeed = 4; // floats are acceptable

  document.addEventListener("keydown", logKeys, false); // find these functions in shooting.js
  document.addEventListener("keyup", useKeys, false);
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  if (!gameover) {
    drawJim();
    drawTown();
    generateEnemies();
    drawEnemies();
    drawScore();
    drawAmmo();
  } else {
    switchToGameoverHandlers(); // this logic could go elsewhere, like at beginning of next condition
    drawTown();
    drawGameOverScreen();
  }
  requestAnimationFrame(draw);
  //You can also add another conditional for if gameBeginning. the drawMenu function or an associated function can call startGame(), which will set gameStarted to true and gameover to false. We will initialise gameStarted as true, and call requestAnimationFrame(draw); in the global scope.
}

function drawJim() {
  let jim = new Image(); // original 16 x 22
  jim.src =
    jimsDirection === "arrowup" || jimsDirection === "w"
      ? "./sprites/Jim/jim up.png" // so this works because the filepath is relative to index.html, from whence this function is called, not rendering.js, from whence it originates. Whence.
      : jimsDirection === "arrowright" || jimsDirection === "d"
      ? "./sprites/Jim/jim right.png"
      : jimsDirection === "arrowdown" || jimsDirection === "s"
      ? "./sprites/Jim/jim down.png"
      : "./sprites/Jim/jim left.png";
  ctx.drawImage(jim, jimOffsetLeft, jimOffsetTop, jimWidth, jimHeight); // you could just ommit these two measurements for a small Jim. Small Jim looks a bit more situated on the ground. If you want big Jim, maybe you should put some rocks under his feet...
}

function drawTown() {
  drawBuilding(0, 0);
  drawBuilding(buildingOffset, 0);
  drawBuilding(0, buildingOffset);
  drawBuilding(buildingOffset, buildingOffset);
}

function drawBuilding(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "#303030";
  ctx.rect(x, y, buildingSize, buildingSize);
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Pixel Cowboy";
  ctx.fillStyle = "#FFF";
  ctx.fillText("Score: " + killCount, 8, 20);
}

function drawAmmo() {
  ctx.font = "16px Pixel Cowboy";
  ctx.fillStyle = "#FFF";
  ctx.fillText(leftCylinder.bullets, canvasSize - 100, 20);
  ctx.fillText(rightCylinder.bullets, canvasSize - 100, 40);
}

function switchToGameoverHandlers() {
  if (gameover) {
    document.removeEventListener("keydown", logKeys, false);
    document.removeEventListener("keyup", useKeys, false);
    window.addEventListener("keyup", replay);
    canvas.addEventListener("click", replay);
  }
}

function drawGameOverScreen() {
  ctx.beginPath(); // this rectangle could be a picture of a wooden board or something.
  ctx.rect(gameoverXOffset, gameoverYOffset, gameoverWidth, gameoverHeight);
  ctx.fillStyle = "#703800";
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = "#ffc16b";
  ctx.font = "32px Pixel Cowboy";
  ctx.fillText("Game Over", gameoverXOffset + 35, gameoverYOffset + 90);
  ctx.fillText("Bad Boy", gameoverXOffset + 100, gameoverYOffset + 140);

  ctx.font = "16px Pixel Cowboy";
  ctx.fillText(
    "Better luck next time.",
    gameoverXOffset + 40,
    gameoverYOffset + 205
  );

  ctx.font = "11px Pixel Cowboy";
  ctx.fillText(
    "Click this box or press r to play again",
    gameoverXOffset + 10,
    gameoverYOffset + 245
  );
}

function replay(e) {
  if (
    e.offsetX >= gameoverXOffset &&
    e.offsetX <= canvasSize - gameoverXOffset &&
    e.offsetY >= gameoverYOffset &&
    e.offsetY <= canvasSize - gameoverYOffset
  ) {
    startGame();
    window.removeEventListener("keyup", replay);
    canvas.removeEventListener("click", replay);
  } else if (e.key.toLowerCase() === "r") {
    // maybe these should be a disjunction... Would make code dryer but LHS of disjunction is already a long conjunction... check out the ctx.isPointInPath method....
    startGame();
    window.removeEventListener("keyup", replay);
    canvas.removeEventListener("click", replay);
  }
}
