/*
## Objectives for a reload system ##

- gradual incrementation
  - bullet-insert sound plays each time
  - the bullet counter increments each time
- interruptable incrementation
  - you can prematurely stop reloading if you press the reload button
- a final stage
  - After reloading is finished, the cylinder must be inserted into the gun
  - a different sound plays, after all the others, and you cannot shoot the gun until it is finished
- gun independence
  - reloading one gun should have no impact on how the other gun performs - but we should not write independent functions for each gun

## how I plan to implement it ##

A reload function which
 - works out which gun to try to reload
 - only does anything if the gun's cylinder is < 6
 - sends off setTimeouts for inserting bullets and inserting the cylinder, separated by times. You can use a for-loop with let, that multiplies i by timeToInsert, to schedule the callbacks to return at the right time. the reload function should send off the cylinder to reload and that cylinder's cycle number with these callbacks.
 - increments the gun's cyclenumber


*/

//

leftCylinder = {
  bullets: 6, // later it might help if these are two-valued arrays. You can use the rest operator to make copies...
  cycle: 0
}

rightCylinder = {
  bullets: 6,
  cycle: 0
}

timeToInsert = 390; // no. of milliseconds to insert a bullet or cylinder

function reload(gun) {
  let cycle;
  let bullets;
  if (gun == 'right') {
    cycle = rightCylinder.cycle;
    bullets = rightCylinder.bullets;
  } else {
    cycle = leftCylinder.cycle;
    bullets = leftCylinder.bullets;
  }

  if (bullets < 6) {
    for(let i = 1; i < 6 - bullets; i++) {
      setTimeout(insertBullet(gun, cycle), i * timeToInsert)
    }
  }
}

function insertBullet(gun, oldCycle) {
  let currentGun = gun == 'right' ? rightCylinder : leftCylinder;
  if (currentGun.cycle == oldCycle) {
    currentGun.bullets++;
    // play sound
  }
}

function insertCylinder(gun, oldCycle) {
 let currentGun = gun = 'right' ? rightCylinder : leftCylinder;
 if (currentGun.cycle == oldCycle) {
   // play sound
   currentGun.cycle++;
 } 
}

// How will you know whether you're dealing with an early reload stop or an early reload start? It seems you have to pass the cycle to reload too. 

// I haven't even tested this but it seems that, to make it work, I'm going to have to learn a lot more about variable scope and also the relationship between binding and reference. 