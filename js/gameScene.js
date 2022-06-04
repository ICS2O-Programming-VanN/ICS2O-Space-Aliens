/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Adds code to Phaser.Scene
class gameScene extends Phaser.Scene {
  constructor() {
    // Runs Phaser
    super({key: 'gameScene'});

    // Initializes the background variable
    this.gameSceneBackground = null;

    // Initializes the laser sprite variable
    this.blasterSprite = null;

    // Only allows one laser to be fired at once
    this.firelaser = false;
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
    this.gameSceneBackground = this.add.image(0, 0, 'labBackground');
    // Positions background image to take up screen
    this.gameSceneBackground.setOrigin(0, 0);

    // Displays Laser Sprite
    this.blasterSprite = this.physics.add.sprite(100, 1080 / 2, 'blasterSprite').setScale(0.25);

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
        this.blasterSprite.x = 0;
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
        this.blasterSprite.x = 1920;
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
        this.blasterSprite.y = 0;
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
        this.blasterSprite.y = 1080;
      }
    }

    // Checks if user is pressing the spacebar
    const keySpacePressed = this.input.keyboard.addKey('SPACE');
    // IF space bar is pressed
    if (keySpacePressed.isDown === true) {
      // Checks if a laser has already been fired while pressing spacebar
      if (this.laserSprite === false) {
        // Adds new laser
        const addNewLaser = this.physics.add.sprite(this.laserSprite.x, this.laserSprite.y, 'laserSprite').setScale(0.1);
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