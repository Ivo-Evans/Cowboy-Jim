const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//measurement variables
const canvasSize = canvas.offsetWidth;
const canvasMiddle = canvasSize / 2;
const buildingSize = 200;
const buildingOffset = canvasSize - buildingSize;
const buildingGap = buildingOffset - buildingSize;
const gameoverXOffset = 100;
const gameoverYOffset = 180;
const gameoverWidth = canvasSize - gameoverXOffset * 2; // maybe it would be better to define the span absolutely and the offset relatively,so that if you resize the canvas the gameover screen won't grow. 
const gameoverHeight = canvasSize - gameoverYOffset * 2;
const jimWidth = 24;
const jimHeight = 33; // note that the image itself is 16 x 22 - these scale it up
const jimOffsetTop = (canvasSize - jimHeight) / 2;
const jimOffsetLeft = (canvasSize - jimHeight) / 2;
const ninjaSize = 30;
const ninjaAnimationSpeedReduction = 1 / 7; // a higher divisor lowers the speed at which ninjas move their legs


// gameplay variables
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

function startGame() {
  window.removeEventListener("keyup", replay);
  canvas.removeEventListener("click", replay);

  jimsDirection = "arrowup";
  killCount = 0;
  gameover = false;

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

  enemyRate = 0.002; // I think a fun game would involve less enemies running faster
  enemySpeed = 2; // floats are acceptable

  document.addEventListener("keydown", logKeys, false); // find these functions in shooting.js
  document.addEventListener("keyup", useKeys, false);

  clearInterval(interval);
  interval = setInterval(draw, 10);
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawJim();
  drawTown();
  generateEnemies();
  drawEnemies();
  drawScore();
  drawAmmo();
  checkForGameOver();
}

function drawJim() {
  let jim = new Image(); // original 16 x 22
  jim.src =
    jimsDirection == "arrowup" || jimsDirection == "w"
      ? "./sprites/Jim/jim up.png" // so this works because the filepath is relative to index.html, from whence this function is called, not rendering.js, from whence it originates. Whence.
      : jimsDirection == "arrowright" || jimsDirection == "d"
      ? "./sprites/Jim/jim right.png"
      : jimsDirection == "arrowdown" || jimsDirection == "s"
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

function checkForGameOver() {
  if (gameover) {
    document.removeEventListener("keydown", logKeys, false);
    document.removeEventListener("keyup", useKeys, false);
    clearInterval(interval);
    interval = setInterval(drawGameOverScreen, 10);
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
  } else if (e.key.toLowerCase() == "r") {
    startGame();
  }
}

/*TODO: add up-down trick shot support // THOUGHT: currently, the gun input refers to the absolute position of the shot, it's not relative to Jim's body or direction. That's fine and good, but it means that the trickshot mechanic doesn't make that much sense. When Jim is facing up, 'd' 'ArrowLeft' is a good shot, but when he is facing down, it is a bad shot. You could only make this idea work if: a) Jim never rotates his body (doesn't make sense), b) the trick shot is determined relative to Jim's current rotation (overly impractical and difficult for the player, since control scheme and camera wouldn't rotate). Why don't you just simplify your game, then, and remove this idea, along with the chance variabe etc etc. Or, alternately, just stop him from rotating his body...? A lot would have to be lost to remove the feature, stuff which has been fun. Then again what has it really gotten you? You, yourself, don't even use it in gameplay, it's just a bit confusing. 
... Maybe it doesn't NEED to make sense. It's a control-scheme dynamic, really - it's there to push player's not to make the most obvious move...
... but maybe it should engender a less bad accuracy reduction, like down to 80% or something, so that it doesn't scare players away from even trying. 

TODO: redesign this as a modular program. Modules: main, ninjas, shooting, reloading

TODO: double points for using both guns at once to kill two enemies (implementation: a killcount and a bonus count feature, which are combined in the score display. Increment difficulty based on kill count, but not on score count

TODO: a popup allerting you to your level up, like a speech bubble across one of the buildings or something

TODO: randomly generated tumble-weed (you can use the icon from the tileset, and rotate it, like weed.rotate(n * Math.pi / 180)) And you can have a tumbleweed object, just like the ninjas one, which lowers or raises its relevant axis once every time. 

TODO: implement choice between HaloMode and CodMode. in CodMode the enemies come suddenly and quickly and it's all about twitch (and some luck). In HaloMode enemies come regularly but more slowly and it's all about consistently good playing - but it's less exciting. 

TODO: give the Jim pictures revolvers
TODO: implement ninja images - ninjameges
TODO: add building images to background - don't redraw them every time draw() is called, that's pointless.
TODO: add all image directories into a dir called images
TODO: make your pseudorandom enemy generation more *pseudo* random... but not farcically so. 
TODO: add a license
*/
