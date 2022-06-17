/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Adds code to Phaser.Scene
class gameScene extends Phaser.Scene {

    // Function that creates a Robot
  createRobot() {
    // Makes robot appear at a random Y location
    const robotYLocation = Math.floor(Math.random() * 1080) + 1;
    
    // Uses Math.random to make robots move slightly to the side
    let robotYVelocity = Math.floor(Math.random() * 50) + 1;
    // Makes Robot move up or down
    robotYVelocity *= Math.round(Math.random()) ? 1 : -1;
    
    // Robot appears every time function is called
    const aRobot = this.physics.add.sprite(1920, robotYLocation, 'robot').setScale(0.4);
    
    // Adds velocity to robot making them move to the left
    aRobot.body.velocity.x = -200;
    // Adds Y velocity
    aRobot.body.velocity.y = robotYVelocity;
    
    // Adds Robot to robot grouping
    this.robotGroup.add(aRobot);
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

    // Initializes Score variable
    this.score = 0;
    // Initializes Score text variable
    this.scoreText = null;
    // Score text Style
    this.scoreTextStyle = { font: '65px Arial', fill: '#013220', align: 'center' };

    // Initializes Game Over Text variable 
    this.gameOverText = null;
    // Game over text style
    this.gameOverTextStyle = { font: '65px Arial', fill: '#00008b', align: 'center' };

    // Initializes Health Points variable
    this.healthPoints = 3;
    // Initializes Health Points text variable
    this.healthPointsText = null;
    // Health Points Text Style
    this.healthPointsTextStyle = { font: '65px Arial', fill: '#013220', align: 'center' };

    // Game Win text variable
    this.gameWinText = null
    // Game Win text variable Style
    this.gameWinTextStyle = { font: '65px Arial', fill: '#00008b', align: 'center' }
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
    
    // Loads Robot Sprite
    this.load.image('robot', './images/robot.png');

    // Loads sound for when the laser beam is fired
    this.load.audio('laserSound', './sounds/laserFiredSound.mp3');

    // Loads sound for when the Laser hits the robot
    this.load.audio('explosion', './sounds/laserToRobotExplosion.mp3');

    // Loads sound for when the robot hits the blaster
    this.load.audio('enemyCollision', './sounds/healthLostSound.mp3');
  }

  create(data) {
    // Creates background for Game Scene
    this.gameSceneBackground = this.add.image(0, 0, 'labBackground').setScale(1.35);
    // Positions background image to take up screen
    this.gameSceneBackground.setOrigin(0, 0);

    // Displays Score text to screen
    this.scoreText = this.add.text(10, 10, 'Robots Destroyed: ' + this.score.toString(), this.scoreTextStyle);

    // Displays health points to screen
    this.healthPointsText = this.add.text(650, 10, 'Health Points: ' + this.healthPoints.toString(), this.healthPointsTextStyle);
    
    // Displays Blaster Sprite
    this.blasterSprite = this.physics.add.sprite(100, 1080 / 2, 'blasterSprite').setScale(0.50);

    // Groups lasers together to have identical properties
    this.laserGroup = this.physics.add.group();

    // Creates group for all Robots
    this.robotGroup = this.add.group();
    // Creates three robots to start off
    this.createRobot();
    this.createRobot();
    this.createRobot();

    // When the laser hits the robots
    this.physics.add.collider(this.laserGroup, this.robotGroup, function (laserCollide, robotCollide) {

      // Destroys the Robot
      robotCollide.destroy();
      
      // Destroys the laser
      laserCollide.destroy();

      // Adds a point to the scoreboard
      this.score += 1
      this.scoreText.setText("Robots Destroyed: " + this.score.toString())

      // Plays explosion sound upon contact
      this.sound.play('explosion');
      
      // Creates two robots for every time one is destroyed
      this.createRobot();
      this.createRobot();

      // If the user gains 50 points / wins
      if (this.score >= 50) {
        // Stops physics to create more robots
        this.physics.pause()

        // Displays Game win Text
        this.gameWinText = this.add.text(1920 / 2, 1080 / 2, 'You won!\nClick to play again.', this.gameWinTextStyle).setOrigin(0.5)
        // Allows the user to play again by clicking
        this.gameWinText.setInteractive({ useHandCursor: true })
        this.gameWinText.on('pointerdown', () => this.scene.start('gameScene'))
        // Resets Score and Health Points
        this.score = 0
        this.healthPoints = 3
      }
      
      // Binds code the class "this"
    }.bind(this));

    // Physics when the robots collide with the blaster
    this.physics.add.collider(this.blasterSprite, this.robotGroup, function (blasterSpriteCollide, robotCollide) {

      // Plays Collision sound
      this.sound.play('enemyCollision');
      
      // Destroys the Robot
      robotCollide.destroy()

      
      // Decreases players health points by 1 every time they get hit
      this.healthPoints -= 1
      // Health Points Display text
      this.healthPointsText.setText('Health Points: ' + this.healthPoints.toString(), this.healthPointsTextStyle)
      blasterSpriteCollide.body.velocity.x = 0

      // IF the player has no health points left
      if (this.healthPoints <= 0) {
        // Stops Physics from creating more robots
        this.physics.pause()
        // Destroys Blaster
        blasterSpriteCollide.destroy()
        // Displays Game Over text and allows user to play the game again by clicking
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over! \nClick to play again", this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true})
        this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
        // Resets Score and Health Points
        this.score = 0
        this.healthPoints = 3
      }
      // Binds code to class "this" 
    }.bind(this))

  }

  update(time, delta) {
    
    // Checks if the user is pressing/moving left
    const keyLeftPressed = this.input.keyboard.addKey('LEFT');
    
    // IF statement checks if left key is pressed and moves the sprite accordingly
    if (keyLeftPressed.isDown === true) {
      // Rotates the blaster so it is facing leftwards
      this.blasterSprite.setAngle(180);
      // Moved lasers left (x-axis)
      this.blasterSprite.x -= 10;
      // Prevents Blaster from going off screen
      if (this.blasterSprite.x < 0) {
        this.blasterSprite.x = 1920;
      }
    }

    // Checks if user is pressing/moving right
    const keyRightPressed = this.input.keyboard.addKey('RIGHT');
    // IF user is pressing/moving right
    if (keyRightPressed.isDown === true) {
      // Rotates Blaster so it is facing forwards (rightwards)
      this.blasterSprite.setAngle(0);
      // Moves Blaster Sprite Right (x-axis)
      this.blasterSprite.x += 10;
      // Prevents Blaster from moving off screen
      if (this.blasterSprite.x > 1920) {
        this.blasterSprite.x = 0;
      }
    }

    // Checks if user is pressing/moving up
    const keyUpPressed = this.input.keyboard.addKey('UP');
    // IF user is pressing/moving up
    if (keyUpPressed.isDown === true) {
      // Rotates Blaster so it faces upwards
      this.blasterSprite.setAngle(-90);
      // Moves Blaster Sprite Up (y-axis)
      this.blasterSprite.y -= 10;
      // Prevents Sprite from going off Screen
      if (this.blasterSprite.y < 0) {
        this.blasterSprite.y = 1080;
      }
    }

    // Checks if user is pressing/moving down
    const keyDownPressed = this.input.keyboard.addKey('DOWN');
    // IF user is pressing/moving down
    if (keyDownPressed.isDown === true) {
      // Rotates Blaster so it faces downwards
      this.blasterSprite.setAngle(90);
      // Moves Blaster down (y-axis)
      this.blasterSprite.y += 10;
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

    // This function makes it so that when a robot reachs the end of the screen, it warps back to the other side
    this.robotGroup.children.each(function (item1) {
      if ((item1.x < 0) || (item1.y < 0)) {
        item1.x = 2000
        let robotYCoord = Math.floor(Math.random() * 1080) + 1
        item1.y = robotYCoord
      }
    })
    
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