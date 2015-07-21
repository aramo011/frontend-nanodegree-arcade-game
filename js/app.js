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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = this.x + (this.speed * dt);
    if (newX <= 505)
        this.x = newX;  // enemy is within screen bounderies
    else {  // enemy reached screen limit, restarting (X,Y) coord and Speed
        this.x = -100;
        this.y = this.baseYPos + (83 * Resources.getRandomInt(0, 2));
        this.speed = 100 * Resources.getRandomInt(1, 3);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.reset();       // Restart player to initial position
    this.shiftX = 0;    // x coordinate pixels movement    
    this.shiftY = 0;    // y coordinate pixels movement
    this.sprite = 'images/char-boy.png';
};

// Reset player's coordinates to initial position (3rd column, 6th row)
Player.prototype.reset = function() { 
    this.x = 202;
    this.y = 405;
};

Player.prototype.update = function() { // set player new position in the map 
    var newX = this.x + this.shiftX;
    var newY = this.y + this.shiftY;

    if ((newX >= 0) && (newX <= 404)) { // player moved within x coord screen limits, new x coord updated
        this.x = newX;
    }
    if ((newY > 0) && (newY <= 415)) { // player moved within x coord screen limits, new y coord updated
        this.y = newY;
    }
    else {
        if (newY <= 0) { // player reached water, player restarts to inital position
            this.reset();
            scoreboard.score++; // increment score by one unit
        }
    }
    this.shiftX = this.shiftY = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Process user input for player movement
Player.prototype.handleInput = function(direction) { // only left, right, up, and down keys are processed. The rest are ignored
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
};

// Scoreboard class to keep game score
var Scoreboard = function() {
    this.score = 0;
};

Scoreboard.prototype.update = function() {
    document.getElementById('score').textContent = this.score; // html span tag text is updated
};


// Gem class for bonus points
var Gem = function() {
    this.x = 0;
    this.y = 0;
    this.renderOn = false;
    this.sprite;

    this.spriteArray = [{ sprite : 'images/gem-blue.png', timeout : 4000 },
                        { sprite : 'images/gem-green.png', timeout : 3000 },
                        { sprite : 'images/gem-orange.png', timeout : 2000 }];
};

// Stop gem rendering
Gem.prototype.reset = function() {
    this.renderOn = false; 
    this.x = 0; 
    this.y = 0;
    clearTimeout(gemTimeout); // stop setTimeout() from firing its anonymous function
};

Gem.prototype.update = function() {
        // generate a random position
        this.x = 26 + 101 * Resources.getRandomInt(0, 4);
        this.y = 119 + 83 * Resources.getRandomInt(0, 2);
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Implement the timing and selection of the gem to be displayed
Gem.prototype.renderTimer = function() {
    setInterval(function() { // set the cycle of gem selection and display, gems appear every 12 sec 
        var gemType = gem.spriteArray[Resources.getRandomInt(0, 2)]; // randomly select gem type
        gem.sprite = gemType.sprite; // update gem sprite property with current gem type
        gem.update(); // update the gem poositioning in the canvas
        gem.renderOn = !(gem.renderOn); // alternate active/inactive gem rendering
        gemTimeout = setTimeout(function() {gem.renderOn = !(gem.renderOn);}, gemType.timeout);
    }, 12000); // set the duration of gem display, depending of gem type would be 4, 3, 2 sec
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = []; // definition and init of array of Enemy objects

// Instantiating five Enemy objects and storing in array of objects
for (var i = 0; i < 5; i++) {
    allEnemies[i] = new Enemy();
}

// instantiating player object
var player = new Player();

// instantiating scoreboard object to keep game scores
var scoreboard = new Scoreboard();

// instantiating gem object to provide bonus feature to the game
var gem = new Gem();

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
