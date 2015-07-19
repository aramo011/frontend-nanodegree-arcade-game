// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.baseXPos = 0;   // base x coordinate
    this.baseYPos = 60;  // base y coordinate

    // random enemy speed selection (speeds: low, medium, fast)
    this.speed = 100 * Resources.getRandomInt(1, 3);

    // Initial enemy position selection, (x,y) position will be randomly selected
    // between upper, middle, and lower stone rows and five stone columns
    this.x = this.baseXPos + (101 * Resources.getRandomInt(0, 5)); 
    this.y = this.baseYPos + (83 * Resources.getRandomInt(0, 2));

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = this.x + (this.speed * dt);
    if (newX <= 505)
        this.x = newX;  // enemy is within screen limits
    else {  // enemy reached screen limit, restarting (X,Y) coord and Speed
        this.x = -100;
        this.y = this.baseYPos + (83 * Resources.getRandomInt(0, 2));
        this.speed = 100 * Resources.getRandomInt(1, 3);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.reset();       // Restart player to initial position
    this.shiftX = 0;    // x coordinate pixels movement    
    this.shiftY = 0;    // y coordinate pixels movement
    this.sprite = 'images/char-boy.png';
}

// Reset player's coordinates to initial position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
}

Player.prototype.update = function() {
    var newX = this.x + this.shiftX;
    var newY = this.y + this.shiftY;

    if ((newX >= 0) && (newX <= 404)) {
        this.x = newX;
    }
    if ((newY > 0) && (newY <= 415)) {
        this.y = newY;
    }
    else {
        if (newY <= 0) {
            this.reset();
        }
    }

    this.shiftX = this.shiftY = 0;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Process user input for player movement
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left'  :
            this.shiftX = -101;
            break;
        case 'right' :
            this.shiftX = 101;
            break;
        case 'up' :
            this.shiftY = -83;
            break;
        case 'down' :
            this.shiftY = 83;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Instantiating five Enemy objects 
for (var i = 0; i < 5; i++) {
    allEnemies[i] = new Enemy();
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
