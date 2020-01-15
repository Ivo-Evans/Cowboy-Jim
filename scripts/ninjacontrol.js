let enemies = {
  top: [],
  right: [],
  bottom: [],
  left: []
};

let enemyRate = 0.002; // I think a fun game would involve less enemies running faster
let enemySpeed = 4; // floats are acceptable


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
    enemies.left.push({ x: 0, y: thisNinja[0], sidestep: thisNinja[1] });
  } else if (chance < enemyRate / 2) {
    enemies.top.push({ x: thisNinja[0], y: 0, sidestep: thisNinja[1] });
  } else if (chance < (enemyRate / 4) * 3) {
    enemies.right.push({ x: 650, y: thisNinja[0], sidestep: thisNinja[1] });
  } else if (chance < enemyRate) {
    enemies.bottom.push({ x: thisNinja[0], y: 650, sidestep: thisNinja[1] });
  }
}

function makeNinjaStartPosition() {
  let lateralPosition = 200 + Math.round(Math.random() * 235); // 220 because the canvas is 650 px, the buildings are 200px (leaving 250 px in the middle) and the ninjas are 30px
  let sideStepfactor = (325 - lateralPosition) / 325;
  return [lateralPosition, sideStepfactor];
}

function drawEnemies() {
  enemies.left.forEach(enemy => {
    renderNinja(enemy);
    enemy.x += enemySpeed;
    enemy.y += enemy.sidestep * enemySpeed;
    if (enemy.x > 300) {
      killNinjas("arrowleft", true);
    }
    // gameover conditions, gameover state
  });

  enemies.top.forEach(enemy => {
    renderNinja(enemy);
    enemy.y += enemySpeed;
    enemy.x += enemy.sidestep * enemySpeed;
    if (enemy.y > 300) {
      killNinjas("arrowup", true);
    }
  });

  enemies.right.forEach(enemy => {
    renderNinja(enemy);
    enemy.x -= enemySpeed;
    enemy.y += enemy.sidestep * enemySpeed;
    if (enemy.x < 300) {
      killNinjas("arrowright", true);
    }
  });

  enemies.bottom.forEach(enemy => {
    renderNinja(enemy);
    enemy.y -= enemySpeed;
    enemy.x += enemy.sidestep * enemySpeed;
    if (enemy.y < 300) {
      killNinjas("arrowdown", true);
    }
  });
}

function renderNinja(ninja) {
  ctx.beginPath();
  ctx.rect(ninja.x, ninja.y, 10, 10);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}
