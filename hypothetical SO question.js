/*
Hi, I'm making a game where you play a stationary character who shoots two revolvers, controlled by wasd and the arrow keys. Reloading can be initiated by e and / for each gun. 

I'm currently trying to rewrite the reload system. I have the following objectives:
  1) reloading one gun should have no effect on the other gun
  2) One set of functions should be able to reload either gun depending on which arguments they are passed
  3) the number of bulets reloaded should be the gun's capacity (6) minus the current bullets
  4) reloading should be incremental and each increment should be separated by a fixed time interval. As well as reloading up to six bullets, there should be a final stage where the cylinder is inserted back into the revolver. 
  5) reloading should be interruptible. Interruption should cause the cylinder-insert 

Objectives 1, 2 and 3 are easy and objective 4 can be achieved like this:

      for(let i = 0; i < 6 - cylinder; i++) {
      setTimeout(insertBullet(cylinder), i * timeToInsert)
    }
    setTimeout(insertCylinder(cylinder), 7 - cylinder * timeToInsert);

where cylinder represents either the right or left cylinder, an integer 0..6.

(thanks to <a href="link to Stack Overflow answer">user's_name</a>)

However, objective 5, especially in combination with the other objectives (like 1 and 2) is causing me some problems. 

First I had the idea that you could have global rightReloading and leftReloading variables which took booleans. The callbacks sent out by setTimeout would have conditionals inside them, so that the callbacks only did anything if the relevant reloading variable was true. insertCylinder would also set the relevant reloading variable to false, so that, if it was called before all scheduled callbacks had returned, they would become ineffective. Finally, I would only call the for-loop above if the cylinder needed to be reloaded, and if it did, I would set the relevant reloading variable to true.

However, this solution fails for an edge-case. If the player is reloading, quickly stop reloading and then starts reloading again, the reloading variable will be true but there will now be twice as many callbacks coming in - they will double their reloading speed. 
// note to self: maybe you should actually make this broken version, to prove that you can

To solve the problem, I thought of replacing the boolean with a number that records which reloading cycle a callback corresponds to. If the current cycle for that gun is the cycle the callback was sent out with, let the callback do its thing; otherwise, the callback should be ineffective. 


*/