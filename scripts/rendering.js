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

const enemyRateStart = 0.004;
const enemySpeedStart = 240;
const enemyRateIncrement = 0.001;
const enemyRateDecrement = 0.002;
const enemySpeedIncrement = 32.5;

let jimsDirection;
let killCount;
let gameover;
let enemies;
let leftCylinder;
let rightCylinder;
let enemyRate;
let enemySpeed;
let interval;

let lastRender = 0;

let sounds = [
  new Audio("./sounds/gunshot.mp3"),
  new Audio("./sounds/insert-bullet.mp3"),
  new Audio("./sounds/insert-cylinder.mp3")
];

sounds.forEach(sound => sound.addEventListener("canplaythrough", loader));

function loader() {
  if (
    sounds[0].readyState + sounds[1].readyState + sounds[2].readyState ===
    12
  ) {
    newGameState();
    requestAnimationFrame(draw);
  }
}

function newGameState() {
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

  enemyRate = enemyRateStart; // I think a fun game would involve less enemies running faster
  enemySpeed = enemySpeedStart; // floats are acceptable //this was 4 before delta

  document.addEventListener("keydown", logKeys, false); // find these functions in shooting.js
  document.addEventListener("keyup", useKeys, false);
}

function draw(elapsedTime) {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  let delta = (elapsedTime - lastRender) / 1000; // this number, a varying number in the region of 0.16, is the number of whole units of other things (e.g. ninja movements) per frame - so 1 ninja movement would be coded as delta * ninja_movement. It accounts for different speeds between frames and browsers. But it also means that other things should be recalibrated
  lastRender = elapsedTime;

  if (!gameover) {
    drawJim();
    drawTown();
    generateEnemies();
    drawEnemies(delta);
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
    (e.offsetX >= gameoverXOffset &&
      e.offsetX <= canvasSize - gameoverXOffset &&
      e.offsetY >= gameoverYOffset &&
      e.offsetY <= canvasSize - gameoverYOffset) ||
    e.key.toLowerCase() === "r"
  ) {
    newGameState();
    window.removeEventListener("keyup", replay);
    canvas.removeEventListener("click", replay);
  }
}

/*
TODO: put variables in their own file? Remove them from the global namespace with IIFEs that give objects to variables? The problem is that this will make your later code far wordier and harder to read
TODO: play gunshot sound once - play() returns a promise - and then() call requestAnimationFrame(draw). Alternately play() each sound and Promise.all() them.
TODO: buildings into background. Get it done. 
*/
