let allEnemies = [];

// Enemies our player must avoid
let Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x; // x position
    this.y = y; // y position
    this.s = s; // enemy speed
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.s) * dt;

    // draw enemies again after they go off the canvas
    if (this.x > 480) {
        this.x = -100;
        this.s = 100 + Math.floor(Math.random() * 500);
    };


    // checks for enemies colision, if character is draw back to the start if enemy is hit
    if ((player.x < this.x + 60) && (player.x + 37 > this.x) && (player.y < this.y + 25) && (30 + player.y > this.y))
    {
        player.x = 200;
        player.y = 385;
    };
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// player object
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (){
    //draws character to start on the middle
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 385;
};

Player.prototype.update = function() {
   
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress){
    if(keyPress === 'left'){
        if(this.x - 100 < 0){ // dosent allow character to move off the left side of the grid
            this.x = 0; // center the character on the middle of a block
        } else {
            this.x -= 100;
        }
    } else if (keyPress === 'up') {

        if(this.y - 85 < 0){
            this.y = 380; // draw character back to the start
        } else {
            this.y -= 85; // draw the character in every square according to y coordinate
        }
    } else if (keyPress === 'right') {
        if (this.x + 100 > 400) { //dosent allow character to move off the right side of the grid
           this.x = 400; // last coordinate of right block of the grid
        } else {
            this.x += 100; // draw character coordinates to the right every keyPress
        }
    } else if (keyPress === 'down') {
        if(this.y + 90 > 380) {
            this.y = 385;
        } else {
            this.y += 90;
        }
    }
} // end of handleInput

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies


// Place the player object in a variable called player
let player = new Player();
let enemyLocation = [60,140,220,300]; // array to store emeny on their correct squares

/* loops through the enemy location array, sets the starting position 0 for Y coordinates,
then places the enemy location according to the array, and set the speed of the enemy
cross the screen by generating a random number with the help of update() method.
*/
enemyLocation.forEach(function(locationY){
    // creates a new Enemy object with a location and random speed and store in enemy variable
    let enemy = new Enemy(0,locationY,100 + Math.floor(Math.random() * 500));
    // push the created object to the array
    allEnemies.push(enemy);
});

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
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// prevents the windows brower to scrool if arrow keys are pressed
// source code from https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);