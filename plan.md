How would it have to work?

    Gameplay description
        Cowboy in middle of screen shoots gradually increasing number of randomly generated oncoming ninjas to protect a woman and himself
        If the ninjas reach him they slice him up and the game ends
        he has two guns, controlled by wasd and arrow keys respectively
        reload early with \ and f
        he can shoot both guns at once. Shooting in opposite directions (facing each other) gives a 100% accuracy rate; shooting in opposite directions facing away from each other gives a 50% accuracy rate (when learning shooting, Jim prioritised style)
        Each revolver has 6 bullets
        Marianne can reload a gun, but not shoot - because she is a girl living in the patriarchy

    Environment description
        Inside town square
        Buildings in each corner of the screen, creating four narrowed channels
        Ninjas come through narrowed channels

    Implementation description
        A barebones version
            - character in middle of screen - no animation
            - enemies generated at random in single file from four directions, walking towards Jim
                A random generator with a minimum number, ninjaRate; each time Math.random() produces a number under the threshold, one of the four edge functions is called - which edge is decided by another/the same random number
            - ninja kills gradually increase ninja frequency
                - a ninja kill increases ninjaFrequency by some very small amount
            - a counter for rightGun and leftGun
                when either reaches 0 or / or f is pressed, set setTimeOut for some period, and then reset to 6
            - a shoot function registered to keyup event
                - shooting function should check chamber capacity before it shoots; if > 0, shoot and rightGun/leftGun --
                - A set of conditionals for which gun:
                    right
                    left
                    bothInwards
                    bothOutwards
                - A separate function which translates arrowup or w into 'up', and is called inside these conditionals
                - Use this value to check the (e.g.) rightEnemiesArray, which will contain objects with x and y keys, for the x key, and splice out the enemy with the closest x coordinate. Maybe I should use an enemies object with four keys: left, top, right, bottom; each of these will contain an array of objects, each of which is an enemy.  
            - Some minimal collision detection
                If a ninja reaches some absolutely defined square of pixels, it is too late. 
        
        Making it more advanced
            - sound effects
            - animations/visual transitions (e.g. Jim turning around)
            - Enemies are spawned at a random place within their respective channel, and have to make a diagonal line towards Jim - enemies need their own linepaths, they can't all be on the same train tracks. 



