let enemies = {
    top: [],
    right: [],
    bottom: [],
    left: []
}

let enemyRate = 0.0002;

function enemiesGenerator() {
    let chance = Math.random()

    if (chance > enemyRate) {
        return;
    } else if (chance <= enemyRate) {
        if (chance <= enemyRate / 4) {
            enemies.top.push(/* whatever I want my ninja default start for top to be */);
        } else if (chance <= enemyRate / 2) {
            enemies.right.push();
        } else if (chance <= enemyRate / 4 * 3) {
            enemies.bottom.push();
        } else {
            enemies.left.push();
        }
    }
}

function enemiesDrawer() { // incrementing and decrementing should be different for each of these, since they need to go different directions; it can be done inline, making the foreach calls multiple-line calls. 
    enemies.top.forEach(enemy => renderNinja(enemy))
    enemies.right.forEach(enemy => renderNinja(enemy))
    enemies.bottom.forEach(enemy => renderNinja(enemy))
    enemies.left.forEach(enemy => renderNinja(enemy))
}

function renderNinja(ninja) {
    // do something with these values to the canvas context
  ninja.x
  ninja.y  
}

function draw() { // this is the central, fundamental function, called every n miliseconds, which refreshes the gamestate
    enemiesGenerator();
    enemiesDrawer();
}