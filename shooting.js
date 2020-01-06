let arrowArray = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright']
let wasdArray = ['w', 'a', 's', 'd']
let acceptedKeys = arrowArray.concat(wasdArray);
let currentKeys = [] 


function killNinjas(direction) {
    if (direction == 'arrowup' || direction == 'w') {if (enemies.top.shift() != undefined) {score++}} 
    if (direction == 'arrowleft' || direction == 'a') {if (enemies.left.shift() != undefined) {score++}} 
    if (direction == 'arrowright' || direction == 'd') {if (enemies.right.shift() != undefined) {score++}}   
    if (direction == 'arrowdown' || direction == 's') {if (enemies.bottom.shift() != undefined) {score++}} 
}

function fireShots(direction, chance) {
    let gunSound = new Audio('./Gunshot sound.mp3'); // first few sounds don't play... why?
    gunSound.play();  
    if (chance) {
        if (Math.random() > chance) {
            killNinjas(direction);
        }
    } else {
        killNinjas(direction);
    }
}

function checkCylinders(gun, direction, chance) {
    if (gun == 'right') {
        if (rightCylinder > 0) {
            fireShots(direction, chance);
            rightCylinder--;
        }
    } else {
        if (leftCylinder > 0) {
            fireShots(direction, chance);
            leftCylinder--;
        }
    }
}

function useKeys(event) {
  if (currentKeys.length > 2) {
        console.log("currentKeys is too long")
  } else if (currentKeys.includes('a') && (currentKeys.includes('b'))) {
      checkCylinders('left', 'a', 0.5)
      checkCylinders('right', 'arrowright', 0.5)
  } else if (currentKeys.length > 1) {
      checkCylinders('right', kpress[0]);
      checkCylinders('left', kpress[1]);
  } else {
      arrowArray.includes(currentKeys[0]) ? checkCylinders('right', currentKeys[0]) : checkCylinders('left', currentKeys[0]);
      // Remember both the first and the second key are passed through logKeys, and it is these filtered results that we now access. 
  }

  currentKeys = []
}

function logKeys(e) {
    let event = e.key.toLowerCase();
    if (arrowArray.includes(event)) {duplicateControl(event, arrowArray)}
    else if (wasdArray.includes(event)) {duplicateControl(event, wasdArray)}
}

function duplicateControl(input, checkAgainst) {
  for(key of checkAgainst) {
      if (currentKeys.includes(key)) {return}
  }
  currentKeys.push(input);
}