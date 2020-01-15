const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let jimsDirection = "arrowup";
let killCount = 0;


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawJim();
  drawTown();
  generateEnemies();
  drawEnemies();
  drawScore();
  drawAmmo();
  checkForGameOver();
}

function drawJim() {
  let jim = new Image(); // 16 x 22
  jim.src =
    jimsDirection == "arrowup" || jimsDirection == "w"
      ? "./sprites/Jim/jim up.png" // so this works because the filepath is relative to index.html, from whence this function is called, not rendering.js, from whence it originates. Whence.
      : jimsDirection == "arrowright" || jimsDirection == "d"
      ? "./sprites/Jim/jim right.png"
      : jimsDirection == "arrowdown" || jimsDirection == "s"
      ? "./sprites/Jim/jim down.png"
      : "./sprites/Jim/jim left.png";
  ctx.drawImage(jim, 310, 310, 24, 33); // Jim isn't currently centered // you could just ommit these two measurements for a small Jim. Small Jim looks a bit more situated on the ground. If you want big Jim, maybe you should put some rocks under his feet...
}

function drawTown() {
  drawBuilding(0, 0);
  drawBuilding(canvas.width - 200, 0);
  drawBuilding(0, canvas.height - 200);
  drawBuilding(canvas.width - 200, canvas.height - 200);
}

function drawBuilding(x, y) {
  ctx.beginPath();
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
  ctx.fillText(leftCylinder.bullets, 550, 20);
  ctx.fillText(rightCylinder.bullets, 550, 40);
}

let interval = setInterval(draw, 10);

function checkForGameOver() {
  if (gameover) {
    console.log(interval);
    clearInterval(interval);
    console.log(interval);
    interval = setInterval(drawGameOverScreen, 10);
  }
}

function drawGameOverScreen() {
  ctx.beginPath()
  ctx.rect(100, 100, 450, 450);
  ctx.fillStyle = "#703800";
  ctx.fill();
  ctx.closePath();
}

/*TODO: add up-down trick shot support // THOUGHT: currently, the gun input refers to the absolute position of the shot, it's not relative to Jim's body or direction. That's fine and good, but it means that the trickshot mechanic doesn't make that much sense. When Jim is facing up, 'd' 'ArrowLeft' is a good shot, but when he is facing down, it is a bad shot. You could only make this idea work if: a) Jim never rotates his body (doesn't make sense), b) the trick shot is determined relative to Jim's current rotation (overly impractical and difficult for the player, since control scheme and camera wouldn't rotate). Why don't you just simplify your game, then, and remove this idea, along with the chance variabe etc etc. Or, alternately, just stop him from rotating his body...? A lot would have to be lost to remove the feature, stuff which has been fun. Then again what has it really gotten you? You, yourself, don't even use it in gameplay, it's just a bit confusing. 
... Maybe it doesn't NEED to make sense. It's a control-scheme dynamic, really - it's there to push player's not to make the most obvious move...
... but maybe it should engender a less bad accuracy reduction, like down to 80% or something, so that it doesn't scare players away from even trying. 


TODO: redesign this as a modular program. Modules: main, ninjas, shooting, reloading

TODO: double points for using both guns at once to kill two enemies (implementation: a killcount and a bonus count feature, which are combined in the score display. Increment difficulty based on kill count, but not on score count

TODO: a popup allerting you to your level up, like a speech bubble across one of the buildings or something

TODO: remove test crutch from killNinjas, implement real gameover condition

TODO: randomly generated tumble-weed (you can use the icon from the tileset, and rotate it, like weed.rotate(n * Math.pi / 180)) And you can have a tumbleweed object, just like the ninjas one, which lowers or raises its relevant axis once every time. 

TODO: implement choice between HaloMode and CodMode. in CodMode the enemies come suddenly and quickly and it's all about twitch (and some luck). In HaloMode enemies come regularly but more slowly and it's all about consistently good playing - but it's less exciting. 

TODO: give the Jim pictures revolvers
TODO: implement ninja images - ninjameges
TODO: add building images to background - don't redraw them every time draw() is called, that's pointless.
TODO: add all image directories into a dir called images
*/
