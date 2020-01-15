/* shooting mechanics */


let arrowArray = ["arrowup", "arrowdown", "arrowleft", "arrowright"];
let wasdArray = ["w", "a", "s", "d"];
let currentKeys = [];
let forbiddenKeys = [];

document.addEventListener("keydown", logKeys, false);
document.addEventListener("keyup", useKeys, false);

function logKeys(e) {
  let event = e.key.toLowerCase();
  if (forbiddenKeys.includes(event)) {
    return;
  }
  if (wasdArray.includes(event)) {
    forbiddenKeys.push(...wasdArray);
    currentKeys.push(event);
  } else if (arrowArray.includes(event)) {
    forbiddenKeys.push(...arrowArray);
    currentKeys.push(event); // repeated inside conditionals so that, e.g., 'f' does not cause problems
  }
}

function useKeys(event) {
  if (event.key.toLowerCase() == "e") {
    reload(leftCylinder);
  } else if (event.key == "/") {
    reload(rightCylinder);
  } else if (currentKeys.includes("a") && currentKeys.includes("arrowright")) {
    if (!rightCylinder.reloading) {
      checkCylinders(leftCylinder, "a", 0.5);
    }
    if (!leftCylinder.reloading) {
      checkCylinders(rightCylinder, "arrowright", 0.5);
    }
  } else if (currentKeys.length > 1) {
    if (!rightCylinder.reloading) {
      checkCylinders(rightCylinder, currentKeys[0]);
    }
    if (!leftCylinder.reloading) {
      checkCylinders(leftCylinder, currentKeys[1]);
    }
  } else {
    if (arrowArray.includes(currentKeys[0]) && !rightCylinder.reloading) {
      checkCylinders(rightCylinder, currentKeys[0]);
    } else if (wasdArray.includes(currentKeys[0]) && !leftCylinder.reloading) {
      checkCylinders(leftCylinder, currentKeys[0]);
    }
  }
  if (currentKeys.length > 0) {
    jimsDirection = currentKeys[0];
  } // a more complex system would have him facing a third direction if his shots were opposites.
  forbiddenKeys = [];
  currentKeys = [];
}

function checkCylinders(gun, direction, chance) {
  if (gun.bullets > 0) {
    gun.bullets--;
    fireShots(direction, chance);
    if (gun.bullets < 1) {
      reload(gun);
    }
  }
}

function fireShots(direction, chance) {
  let gunSound = new Audio("./sounds/gunshot.mp3"); // first few sounds don't play... why?
  gunSound.volume = 0.5;
  gunSound.play();
  if (chance) {
    if (Math.random() > chance) {
      killNinjas(direction);
    }
  } else {
    killNinjas(direction);
  }
}

function killNinjas(direction, test) {
  if (direction == "arrowup" || direction == "w") {
    if (enemies.top.shift() != undefined) {
      killCount++;
    }
  }
  if (direction == "arrowleft" || direction == "a") {
    if (enemies.left.shift() != undefined) {
      killCount++;
    }
  }
  if (direction == "arrowright" || direction == "d") {
    if (enemies.right.shift() != undefined) {
      killCount++;
    }
  }
  if (direction == "arrowdown" || direction == "s") {
    if (enemies.bottom.shift() != undefined) {
      killCount++;
    }
  }
  if (test == false) {
    modulateDifficulty();
  }
  // modulateDifficulty();
}
