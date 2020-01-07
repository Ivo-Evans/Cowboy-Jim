export let enemies = {
    top: [],
    right: [],
    bottom: [],
    left: []
}
export let enemyRate = 0.01 // I think a fun game would involve less enemies running faster
export let enemySpeed = 2; // floats are acceptable

export function generateEnemies() {
    let chance = Math.random();
    let thisNinja = makeNinjaStartPosition();
    if (chance < enemyRate / 4) {
     enemies.left.push({x: 0, y: thisNinja[0], sidestep: thisNinja[1]}) 
    } else if (chance < enemyRate / 2) {
     enemies.top.push({x: thisNinja[0], y: 0, sidestep: thisNinja[1]})
    } else if (chance < enemyRate / 4 * 3) {
     enemies.right.push({x: 650, y: thisNinja[0], sidestep: thisNinja[1]})
    } else if (chance < enemyRate) {
     enemies.bottom.push({x: thisNinja[0], y: 650,  sidestep: thisNinja[1]})
    }
 }
 
 export function makeNinjaStartPosition() {
     let lateralPosition = 200 + Math.round(Math.random() * 250);
     let sideStepfactor = (325 - lateralPosition) / 325;
     return [lateralPosition, sideStepfactor];
 }
 
 export function drawEnemies() {
     enemies.left.forEach(enemy => {
         renderNinja(enemy);
         enemy.x += enemySpeed;
         enemy.y += enemy.sidestep * enemySpeed;
         // gameover conditions, gameover state
     })
 
     enemies.top.forEach(enemy => {
         renderNinja(enemy);
         enemy.y += enemySpeed;
         enemy.x += enemy.sidestep * enemySpeed;
     })
     
     enemies.bottom.forEach(enemy => {
         renderNinja(enemy);
         enemy.y -= enemySpeed;
         enemy.x += enemy.sidestep * enemySpeed;
     })
 
     enemies.right.forEach(enemy => {
         renderNinja(enemy);
         enemy.x -= enemySpeed;
         enemy.y += enemy.sidestep * enemySpeed;
     })
 }
 
 export function renderNinja(ninja) {
     ctx.beginPath()
     ctx.rect(ninja.x, ninja.y, 30, 30)
     ctx.fillStyle = "black";
     ctx.fill();
     ctx.closePath();
 }
 