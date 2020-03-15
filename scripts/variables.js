const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const dimensions = function(){
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
  return {canvasSize, canvasMiddle, buildingSize, buildingOffset, buildingGap, ninjaSize, ninjaAnimationSpeedReduction, gameoverXOffset, gameoverYOffset, gameoverWidth, gameoverHeight, jimWidth, jimHeight, jimOffsetTop, jimOffsetLeft}
}()