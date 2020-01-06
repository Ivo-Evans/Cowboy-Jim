// document.addEventListener('keydown', logKeys, false);
// document.addEventListener('keyup', useKeys, false);

// const acceptedKeys =['ArrowUp', 'ArrowDown', 'Arrowleft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D']
// const kPress = [] // current keys. Shortened because of its use in useKeys()

// function logKeys(e) {
//     if (acceptedKeys.includes(e.key)) {kPress.push(e.key.toLowerCase())}
// }

// function useKeys(e) {
//     if (acceptedKeys.includes(e.key)) {kPress.push(e.key.toLowerCase())}
//     if (kPress.includes('a') && kPress.includes('ArrowRight')) {
//         // call shoot with disabling parameter, twice, once with direction 'a' and once with 'ArrowRight'

//         // Ivo this restricted shooting thing is not only hard to program, but hard to enforce. What is to stop the player pressing ArrowRight and a in quick succession? Maybe nothing, but maybe most won't come to this conclusion and will just play it 'right'
//     } else if (/* conjunction of two epic, 4way disjunctions  */) {
//         // call shoot twice, with 0 and 1 index of kPress
//     } else { // maybe add an if kpress.length > 0
//         // call shoot once, with 0 index of kPress
//     }
//     kPress = [] // question: will this be too fast to allow double-shooting?
//     // problem scenario: the user is holding down a, thus continually adding keydowns, but tapping right-hand buttons - each one will be registered as a double shot - not so bad.
// }

// function shoot(key) {
//    if (key == 'ArrowUp' || 'w') {if (enemies.top.shift() != undefined) {score++}} 
//    if (key == 'ArrowLeft' || 'a') {if (enemies.left.shift() != undefined) {score++}} 
//    if (key == 'ArrowRight' || 'd') {if (enemies.right.shift() != undefined) {score++}}   
//    if (key == 'ArrowDown' || 's') {if (enemies.bottom.shift() != undefined) {score++}} 
//    let gunSound = new Audio('./Gunshot sound.wav');
//    gunSound.play();
//    event.preventDefault(); // TODO: make this work
// }
