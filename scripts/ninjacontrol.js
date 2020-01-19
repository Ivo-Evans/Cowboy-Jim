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
    enemies.right.push({ x: canvasSize, y: thisNinja[0], sidestep: thisNinja[1] });
  } else if (chance < enemyRate) {
    enemies.bottom.push({ x: thisNinja[0], y: canvasSize, sidestep: thisNinja[1] });
  }
}

function makeNinjaStartPosition() {
  let lateralPosition =
    buildingSize + Math.round(Math.random() * buildingGap - ninjaSize);
  let sideStepfactor = (canvasMiddle - lateralPosition) / canvasMiddle;
  return [lateralPosition, sideStepfactor];
}

function drawEnemies() {
  enemies.left.forEach(enemy => {
    renderNinja(enemy);
    enemy.x += enemySpeed;
    enemy.y += enemy.sidestep * enemySpeed;
    if (enemy.x > (canvasSize - jimWidth) / 2 - ninjaSize) {
      gameover = true;
    }
  });

  enemies.top.forEach(enemy => {
    renderNinja(enemy);
    enemy.y += enemySpeed;
    enemy.x += enemy.sidestep * enemySpeed;
    if (enemy.y > (canvasSize - jimHeight) / 2 - ninjaSize) {
      gameover = true;
    }
  });

  enemies.right.forEach(enemy => {
    renderNinja(enemy);
    enemy.x -= enemySpeed;
    enemy.y += enemy.sidestep * enemySpeed;
    if (enemy.x < (canvasSize + jimWidth) / 2) {
      gameover = true;
    }
  });

  enemies.bottom.forEach(enemy => {
    renderNinja(enemy);
    enemy.y -= enemySpeed;
    enemy.x += enemy.sidestep * enemySpeed;
    if (enemy.y < (canvasSize + jimHeight) / 2) {
      gameover = true;
    }
  });
}

function renderNinja(ninja) {
  ctx.beginPath();
  ctx.rect(ninja.x, ninja.y, ninjaSize, ninjaSize);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}
