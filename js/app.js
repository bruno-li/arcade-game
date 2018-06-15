
// Global variables
let goal = false; // to keep track of the score
let allEnemies = []; // to store enemies objects
let enemyLocation = [60,140,220,300]; // array to store emeny on their correct squares


window.onload = function() {
    window.location.href = "#openModal";
}

    /* ---------------ENEMY CONSTRUCTOR AND ITS PROTOTYPE ------------------- */
// Enemies our player must avoid
let Enemy = function(x,y,s) {
    this.x = x; // x position
    this.y = y; // y position
    this.s = s; // enemy speed
    this.sprite = 'images/enemy-bug.png';
}; // enemy constructor

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += (this.s) * dt;

    // logic to draw enemies again after they go off the canvas
    if (this.x > 480) {
        this.x = -100;
        this.s = 100 + Math.floor(Math.random() * 400);
    }

    // checks for enemies colision, character is draw back to the start if hit an enemy
    // source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if ((player.x < this.x + 60) && (player.x + 37 > this.x) && (player.y < this.y + 25) && (30 + player.y > this.y))
    {
        player.x = 200; // draw character back to the start
        player.y = 385;
        player.score = 0; // resets score to 0
    }
} //update

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} // render

    /* ---------------PLAYER CONSTRUCTOR AND ITS PROTOTYPE ------------------- */

// player constructor
let Player = function (){
    //draws character to start on the middle
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.x = 200;
    this.y = 385;
} // player constructor

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '30pt visitor'; // custom font
    ctx.fillText('Score:' + ' ' + this.score, 0, 30); // Draw score board on the canvas
} //render

Player.prototype.update = function() {
    ctx.clearRect(0, 0, 500, 500);
    //switches goal to true and add to score board
    if (goal) {
        this.score++; 
        goal = false; // switches goal to false again for the next score point
    }
} // update

Player.prototype.handleInput = function (keyPress){
    if(keyPress === 'left'){
        if(this.x - 100 < 0){ // dosent allow character to move off the left side of the grid
            this.x = 0; // center the character on the middle of a block
        } else {
            this.x -= 100;
        }

    } else if (keyPress === 'up') {
        if(this.y - 85 < 0){
            goal = true;
            player.update(); // call update method to update score
            this.y = 380; // draw character back to the start
        } else {
            this.y -= 85; // draw the character and move up to step in every square according to y coordinate
        }

    } else if (keyPress === 'right') {
        if (this.x + 100 > 400) { //dosent allow character to move off the right side of the grid
           this.x = 400; // last coordinate of right block of the grid
        } else {
            this.x += 100; // draw character coordinates to the right squares every keyPress
        }

    } else if (keyPress === 'down') {
        if(this.y + 85 > 385) {
            this.y = 385;
        } else {
            this.y += 85; // // draw character coordinates down to every squares for every keyPress
        }
    } // end of if/else statements
} // end of handleInput

/* loops through the enemy location array, sets the starting position 0 for Y coordinates,
then places the enemy location according to the array, and set the speed of the enemy
crossing the screen by generating a random number with the help of update() method.
*/
enemyLocation.forEach(function(location){
    // creates a new Enemy object with a location and random speed and store in enemy variable
    let enemy = new Enemy(0,location,120 + Math.floor(Math.random() * 400));
    // push the created object to the array
    allEnemies.push(enemy);
}); // forEach

// Place the player object in a variable called player
// instantiate new Player constructor
let player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// add extra keys for player to choose with what keys to play with
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
}); // event listener

// prevents the windows brower to scrool if arrow keys are pressed
// source code from https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);