let arrowArray = ["arrowup", "arrowdown", "arrowleft", "arrowright"];
let wasdArray = ["w", "a", "s", "d"];
let converter = {
  arrowup: "w",
  arrowdown: "s",
  arrowleft: "a",
  arrowright: "d"
};
let currentKeys = [];
let forbiddenKeys = [];
let handicap = 0.5; // note that this is an inverse handicap: 0.8 means you are 0.2 off 100%

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

function useKeys(e) {
  let event = e.key.toLowerCase();
  if (event == "e") {
    reload(leftCylinder);
  } else if (event == "/") {
    reload(rightCylinder);
  } else if (currentKeys.length > 2) { // there still isn't any kind of check here for there actually being double enemies... maybe a method needs to be created. It could go under first conditional, and take left
    let leftAccuracy = false;
    let rightAccuracy = false;
    if (currentKeys.includes("a") && currentKeys.includes("arrowright")) {
      leftAccuracy = willJimMiss();
      rightAccuracy = willJimMiss(); // there could be double for if both leftAccuracy and rightAccuracy, double = true, else double = false. ternary.
    }
    // isDoubleValid(leftAccuracy, rightAccuracy)
    checkCylinders(leftCylinder, currentKeys[0], true, leftAccuracy);
    checkCylinders(rightCylinder, currentKeys[1], true, rightAccuracy);
  } else {
    if (wasdArray.includes(currentKeys[0])) {
      checkCylinders(leftCylinder, currentKeys[0], false, leftAccuracy);
    } else {
      checkCylinders(rightCylinder, currentKeys[0], false, rightAccuracy);
    }
  }
}

function isDoubleValid(missOne, missTwo) {
  if (missOne || missTwo) {
    return false;
  } else {
    // double checking, return bool. Actually quite difficult. For instance, what about key-combo 'w' 'arrowup'. 
  }
}

function willJimMiss() {
  return Math.random() > handicap;
}

function checkCylinders(gun, direction, double, miss) {
  if (arrowArray.includes(direction)) {
    direction = converter[direction];
  }
  if (gun.bullets > 0) {
    fireShots(gun, direction, double, miss);
  }
  if (gun.bullets < 1) {
    reload(gun);
  }
}

function fireShots(gun, direction, double, miss) {
  gun.bullets--; // maybe this should be in previous function, checkCylinders
  // play sounds
  if (miss) {
    return;
  } else {
    killNinjas(direction, double);
  }
}

function killNinjas(direction, double) {
 if (direction == 'w') { // remember that by this point arrowup has been converted to 'w';
   if (enemies.top.shift() != undefined) {
    killCount++;
    if(double) {
      bonusPoints++;
    }
   }
 } else if (direction == 'a') {
   //
 } else if (direction == 's') {
   //
 } else if (direction == 'd') {

 }
}