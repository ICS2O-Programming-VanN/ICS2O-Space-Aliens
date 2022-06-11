/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Adds code to Phaser.Scene
class gameScene extends Phaser.Scene {

    //function definition for creating a pesticide enemy (using a function because it will be referenced multiple times throughout the code)
  createPesticide() {
    //creating a variable to make enemies appear at a random y location between 1 and 1080 px
    const pesticideYLocation = Math.floor(Math.random() * 1080) + 1;
    
    //using a variable and Math.random() to make the pesticides move slightly up or down and be less predictable
    let pesticideYVelocity = Math.floor(Math.random() * 50) + 1;
    //multiplying the pesticideYVelocity by a negative or positive 1 to make pesticides move slightly up or down
    pesticideYVelocity *= Math.round(Math.random()) ? 1 : -1;
    
    //creating a variable that makes an enemy appear each time this function is called
    const aPesticide = this.physics.add.sprite(1920, pesticideYLocation, 'pesticide').setScale(0.4);
    
    //adding an x velocity to the pesticide created using physics to make the enemy move to the right of the screen (towards the bee sprite)
    aPesticide.body.velocity.x = -200;
    //adding the y velocity using the variable defined above
    aPesticide.body.velocity.y = pesticideYVelocity;
    
    //adding the new sprite enemy created to the pesticide group
    this.pesticideGroup.add(aPesticide);
  }

  
  constructor() {
    // Runs Phaser
    super({key: 'gameScene'});

    // Initializes the background variable
    this.gameSceneBackground = null;

    // Initializes the laser sprite variable
    this.blasterSprite = null;

    // Only allows one laser to be fired at once
    this.firelaser = false;

     //initializing variables for the score and the text displaying the score
    this.score = 0;
    this.scoreText = null;
    //using a variable to select a font for the score
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' };

    //initializing a variable for the game over text
    this.gameOverText = null;
    //styling the game over text
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' };

    //initializing variables for health points and the text displaying the health points
    this.healthPoints = 3;
    this.healthPointsText = null;
    //using a variable to select a font for the health points
    this.healthPointsTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' };

    //initializing a variable for the user's high score
    this.highScore = localStorage.getItem('Highscore');
  }

  init(data) {
    // Initializing background colour
    this.cameras.main.setBackgroundColor("#BCDADE");
  }

  preload() {
    // Displays what scene is running in console
    console.log("Game Scene");

    // Loads background image
    this.load.image('labBackground', './images/gameSceneBackground.jpg');

    // Loads Blaster Sprite
    this.load.image('blasterSprite', './images/blasterSprite.png');

    // Loads Laser Beam Sprite
    this.load.image('laserSprite', './images/laserBeam.png');

    // Loads sound for when the laser beam is fired
    this.load.audio('laserSound', './sounds/laserFiredSound.wav');
  }

  create(data) {
    // Creates background for Game Scene
    this.gameSceneBackground = this.add.image(0, 0, 'labBackground').setScale(1.35);
    // Positions background image to take up screen
    this.gameSceneBackground.setOrigin(0, 0);
    
    // Displays Laser Sprite
    this.blasterSprite = this.physics.add.sprite(100, 1080 / 2, 'blasterSprite').setScale(0.50);

    // Groups lasers together to have identical properties
    this.laserGroup = this.physics.add.group();
  }

  update(time, delta) {
    
    // Checks if the user is pressing/moving left
    const keyLeftPressed = this.input.keyboard.addKey('LEFT');
    
    // IF statement checks if left key is pressed and moves the sprite accordingly
    if (keyLeftPressed.isDown === true) {
      // Moved lasers left (x-axis)
      this.blasterSprite.x -= 5;
      // Prevents Blaster from going off screen
      if (this.blasterSprite.x < 0) {
        this.blasterSprite.x = 1920;
      }
    }

    // Checks if user is pressing/moving right
    const keyRightPressed = this.input.keyboard.addKey('RIGHT');
    // IF user is pressing/moving right
    if (keyRightPressed.isDown === true) {
      // Moves Blaster Sprite Right (x-axis)
      this.blasterSprite.x += 5;
      // Prevents Blaster from moving off screen
      if (this.blasterSprite.x > 1920) {
        this.blasterSprite.x = 0;
      }
    }

    // Checks if user is pressing/moving up
    const keyUpPressed = this.input.keyboard.addKey('UP');
    // IF user is pressing/moving up
    if (keyUpPressed.isDown === true) {
      // Moves Blaster Sprite Up (y-axis)
      this.blasterSprite.y -= 5;
      // Prevents Sprite from going off Screen
      if (this.blasterSprite.y < 0) {
        this.blasterSprite.y = 1080;
      }
    }

    // Checks if user is pressing/moving down
    const keyDownPressed = this.input.keyboard.addKey('DOWN');
    // IF user is pressing/moving down
    if (keyDownPressed.isDown === true) {
      // Moves Blaster down (y-axis)
      this.blasterSprite.y += 5;
      // Prevents Blaster from going off screen
      if (this.blasterSprite.y > 1080) {
        this.blasterSprite.y = 0;
      }
    }

    // Checks if user is pressing the spacebar
    const keySpacePressed = this.input.keyboard.addKey('SPACE');
    // IF space bar is pressed
    if (keySpacePressed.isDown === true) {
      // Checks if a laser has already been fired while pressing spacebar
      if (this.laserSprite === false) {
        // Adds new laser
        const addNewLaser = this.physics.add.sprite(this.blasterSprite.x, this.blasterSprite.y, 'laserSprite').setScale(0.1);
        // Adds laser to group of lasers
        this.laserGroup.add(addNewLaser);
        // Plays Sound effect when laser fired
        this.sound.play('laserSound');
        // Makes laser being fired true
        this.laserSprite = true;
      }
    }

    // IF the spacebar is not being pressed, the user can fired several lasers
    if (keySpacePressed.isUp === true) {
      // Sets the laserSprite variable to false so that the laser can be fired again
      this.laserSprite = false;
    }

    // Function to all lasers
    this.laserGroup.children.each(function (item) {
      // Makes it so each laser moves towards the right
      item.x = item.x + 15;
      // Destroys laser when they reach the end of the screen
      if (item.x > 1920) {
        item.destroy();
      }
    })
  }
}

export default gameScene