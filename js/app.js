// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
            this.y = 380;
        } else {
            this.y += 90;
        }
    }
} // end of handleInput

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// Place the player object in a variable called player
let player = new Player();
let enemy = new Enemy();

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