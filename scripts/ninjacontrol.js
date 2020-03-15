function modulateDifficulty() {
  if (killCount % 50 === 0) {
    enemyRate -= enemyRateDecrement;
    enemySpeed += enemySpeedIncrement;
  } else if (killCount % 10 === 0) {
    enemyRate += enemyRateIncrement;
  }
}

function generateEnemies() {
  let chance = Math.random();
  let thisNinja = makeNinjaStartPosition();
  if (chance < enemyRate / 4) {
    enemies.left.push({
      x: 0,
      y: thisNinja[0],
      sidestep: thisNinja[1],
      runcyclePosition: 0,
      images: Array(8).fill(null).map((img, i) => {
        img = new Image()
        img.src = `./Ninjas/black versions/Ninja-${i}-2.png`;
        return img;
      })
    });
  } else if (chance < enemyRate / 2) {
    enemies.top.push({
      x: thisNinja[0],
      y: 0,
      sidestep: thisNinja[1],
      runcyclePosition: 0,
      images: Array(8).fill(null).map((img, i) => {
        img = new Image();
        img.src = `./Ninjas/black versions/Ninja-${i}-0.png`;
        return img;
      })
    });
  } else if (chance < (enemyRate / 4) * 3) {
    enemies.right.push({
      x: canvasSize,
      y: thisNinja[0],
      sidestep: thisNinja[1],
      runcyclePosition: 0,
      images: Array(8).fill(null).map((img, i) => {
        img = new Image();
        img.src = `./Ninjas/black versions/Ninja-${i}-1.png`;
        return img;
      })
    });
  } else if (chance < enemyRate) {
    enemies.bottom.push({
      x: thisNinja[0],
      y: canvasSize,
      sidestep: thisNinja[1],
      runcyclePosition: 0,
      images: Array(8).fill(null).map((img, i) => {
        img = new Image();
        img.src = `./Ninjas/black versions/Ninja-${i}-3.png`;
        return img;
      })
    });
  }
}

function makeNinjaStartPosition() {
  let lateralPosition =
    buildingSize + Math.round(Math.random() * buildingGap - ninjaSize);
  let sideStepfactor = (canvasMiddle - lateralPosition) / canvasMiddle;
  return [lateralPosition, sideStepfactor];
}

function drawEnemies(delta) {
  enemies.left.forEach(enemy => {
    renderNinja(enemy);
    enemy.x += enemySpeed * delta;
    enemy.y += enemy.sidestep * enemySpeed * delta;
    if (enemy.x > (canvasSize - jimWidth) / 2 - ninjaSize) {
      gameover = true;
    }
  });

  enemies.top.forEach(enemy => {
    renderNinja(enemy);
    enemy.y += enemySpeed * delta;
    enemy.x += enemy.sidestep * enemySpeed * delta;
    if (enemy.y > (canvasSize - jimHeight) / 2 - ninjaSize) {
      gameover = true;
    }
  });

  enemies.right.forEach(enemy => {
    renderNinja(enemy);
    enemy.x -= enemySpeed * delta;
    enemy.y += enemy.sidestep * enemySpeed * delta;
    if (enemy.x < (canvasSize + jimWidth) / 2) {
      gameover = true;
    }
  });

  enemies.bottom.forEach(enemy => {
    renderNinja(enemy);
    enemy.y -= enemySpeed * delta;
    enemy.x += enemy.sidestep * enemySpeed * delta;
    if (enemy.y < (canvasSize + jimHeight) / 2) {
      gameover = true;
    }
  });
}

function renderNinja(ninja) {
  let moment = Math.round(ninja.runcyclePosition) % 8;
  ctx.drawImage(ninja.images[moment], ninja.x, ninja.y, ninjaSize, ninjaSize);
  ninja.runcyclePosition += ninjaAnimationSpeedReduction;
}
