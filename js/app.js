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
        this.x = newX; // enemy is within screen limits
    else { // enemy reached screen limit, restarting (X,Y) coord and Speed
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
    this.x = this.newXpos = 202;
    this.y = this.newYpos = 405;
    //this.newXpos = 0;
    //this.newYpos = 0;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    if ((this.newXpos >= 0) && (this.newXpos <= 404)) {
        this.x = this.newXpos;
    }
    if ((this.newYpos > 0) && (this.newYpos <= 415)) {
        this.y = this.newYpos;
    }
    else {
        if (this.newYpos <= 0)
            // player reached water, player position is reset
            this.x = this.newXpos = 202;
            this.y = this.newYpos = 405;

    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
    //var newXpos, newYpos;
    switch (direction) {
        case 'left'  : 
            this.newXpos = this.x - 101;
            //newXpos = this.x - 101;
            //if (newXpos >= 0)
            //    this.x = newXpos;
            break;

        case 'right' : 
            this.newXpos = this.x + 101;
            //newXpos = this.x + 101;
            //if (newXpos <= 404)
            //    this.x = newXpos;
            break;

        case 'up' :
            this.newYpos = this.y - 83;
            //newYpos = this.y - 83;
            //if (newYpos > 0)
            //    this.y = newYpos;
            //else { // player reached water, player is reset
            //    this.x = 202;
            //    this.y = 405;
            //}
            break;

        case 'down' :
            this.newYpos = this.y + 83;
            //newXpos = this.y + 83;
            //if (newXpos <= 415)
            //    this.y = newXpos;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
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
