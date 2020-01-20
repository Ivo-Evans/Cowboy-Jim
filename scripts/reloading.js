function reload(gun) {
  if (gun.bullets < 6) {
    gun.cycle++;

    let currentCycle = [gun.cycle][0];
    if (gun.reloading) {
      insertCylinder(gun, currentCycle); // this and 6 - gun.bullets in the below timeout for quick reload. Alternately 7 and settimeout above
    } else {
      gun.reloading = true;
      for (let i = 0; i < 6 - gun.bullets; i++) {
        setTimeout(() => insertBullet(gun, currentCycle), i * 400 + 200);
      }
      setTimeout(
        () => insertCylinder(gun, currentCycle),
        (6 - gun.bullets) * 400 - 100
      );
    }
  }
}

function insertBullet(gun, oldCycle) {
  if (gun.cycle == oldCycle) {
    gun.bullets++;
    let insert = new Audio("./sounds/insert-bullet.mp3");
    insert.volume = 0.4;
    insert.play();
  }
}

function insertCylinder(gun, oldCycle) {
  if (gun.cycle == oldCycle) {
    let insert = new Audio("./sounds/insert-cylinder.mp3");
    insert.volume = 0.4;
    insert.play();
    setTimeout(() => {
      gun.reloading = false;
    }, 20); // sound is actually 45 ms
  }
}
