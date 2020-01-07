/*
export {logKeys, useKeys, rightCylinder, leftCylinder, kPress};
import {enemies} from './cowboy_jim.js'

let rightCylinder = 6;
let leftCylinder = 6;
const acceptedKeys =['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D']
let kPress = [] // current keys. Shortened because of its use in useKeys()


function logKeys(e) {
    if (kPress.includes(e.key.toLowerCase())) {return}
    if (acceptedKeys.includes(e.key)) {kPress.push(e.key.toLowerCase())}
}

function useKeys() {
    if (kPress.includes('a') && kPress.includes('arrowright')) {
        Math.random() > 0.5 ? kill('a') : shotsFired('left');
        Math.random() > 0.5 ? kill('ArrowRight') : shotsFired('right');
    } else if ((kPress.includes('w') || kPress.includes('a') || kPress.includes('s') || kPress.includes('d')) && (kPress.includes('arrowup') || kPress.includes('arrowleft') || kPress.includes('arrowdown') || kPress.includes('arrowright'))) {
        kill(kPress[0])
        kill(kPress[1]) // this won't be perfectly reliable if the user presses three buttons...
    } else {
        kill(kPress[0])
    }
    kPress = []; // maybe it would be more 'programmerly' to do the above with pop and just trust that kPress will not become overloaded...
}

function shotsFired(gun) {
    let gunSound = new Audio('./Gunshot sound.mp3'); // first few sounds don't play... why?
    gunSound.play();  
    if (gun == 'right') {
        rightCylinder--;
        if (rightCylinder < 1) {
            setTimeout(() => {
                rightCylinder = 6;
            }, 2000);
        }
    } else if (gun == 'left') {
        leftCylinder--;
        if (leftCylinder < 1) {
            setTimeout(() => {
                leftCylinder = 6;
            }, 2000);
        }
    } 
    // also add an ammo decreaser which is conditional on the flag given as a parameter - left or right
}

function kill(direction) {
    if (direction == 'arrowup' || direction == 'w') {if (enemies.top.shift() != undefined) {score++}} 
    if (direction == 'arrowleft' || direction == 'a') {if (enemies.left.shift() != undefined) {score++}} 
    if (direction == 'arrowright' || direction == 'd') {if (enemies.right.shift() != undefined) {score++}}   
    if (direction == 'arrowdown' || direction == 's') {if (enemies.bottom.shift() != undefined) {score++}} 
    event.preventDefault(); // TODO: make this work
    if (['w', 'a', 's', 'd'].includes(direction)) {shotsFired('left')}
    if (['arrowup', 'arrowleft', 'arrowright', 'arrowdown'].includes(direction)) {shotsFired('right')}
 }
 */