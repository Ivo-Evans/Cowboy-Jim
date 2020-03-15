const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const dimensions = (function() {
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
  return {
    canvasSize,
    canvasMiddle,
    buildingSize,
    buildingOffset,
    buildingGap,
    ninjaSize,
    ninjaAnimationSpeedReduction, // not even a dimension ffs lol
    gameoverXOffset,
    gameoverYOffset,
    gameoverWidth,
    gameoverHeight,
    jimWidth,
    jimHeight,
    jimOffsetTop,
    jimOffsetLeft
  };
})();

const difficultyRules = {
  enemyRateStart: 0.004,
  enemySpeedStart: 240,
  enemyRateIncrement: 0.001,
  enemyRateDecrement: 0.002,
  enemySpeedIncrement: 32.5
};

let lastRender = 0;
let gamestate = newGame();

function newGame(params) {
  document.addEventListener("keydown", logKeys, false); // find these functions in shooting.js
  document.addEventListener("keyup", useKeys, false);

  return {
    gameover: false,
    jimsDirection: "arrowup",
    killCount: 0,
    enemies: { top: [], right: [], bottom: [], left: [] },
    leftCylinder: {
      bullets: 6,
      cycle: 0,
      reloading: false
    },
    rightCylinder: {
      bullets: 6,
      cycle: 0,
      reloading: false
    },
    enemyRate: difficultyRules.enemyRateStart,
    enemySpeed: difficultyRules.enemySpeedStart
  };
}
