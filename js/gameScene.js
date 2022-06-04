//code written below extends (adds to) prewritten code in Phaser.Scene
class gameScene extends Phaser.Scene {
  constructor() {
    //"super" accesses the properties of Phaser first
    super({key: 'gameScene'});

    //initializing the background variable
    this.gameSceneBackground = null;

    //initializing the laser sprite variable
    this.blasterSprite = null;

    //creating a boolean variable which will later make sure that only one bolt can be fired each time the space bar is pressed
    this.fireBolt = false;
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#BCDADE");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Game Scene");

    //loading the background image
    this.load.image('labBackground', './images/gameSceneBackground.jpg');

    //loading the laser sprite image
    this.load.image('blasterSprite', './images/blasterSprite.png');

    //loading the image for the "bolt"/missile fired from the from the laser
    this.load.image('laserSprite', './images/laserBeam.png');

    //loading the sound file for when a bolt is fired
    this.load.audio('laserSound', './sounds/laserFiredSound.wav');
  }

  create(data) {
    //creating the background to display to the screen
    this.gameSceneBackground = this.add.image(0, 0, 'labBackground');
    //positioning the background image to take up the screen
    this.gameSceneBackground.setOrigin(0, 0);

    //creating the laser sprite on the screen
    this.blasterSprite = this.physics.add.sprite(100, 1080 / 2, 'blasterSprite').setScale(0.25);

    //creating a "group" for all the bolts/missiles to have the same properties
    this.laserGroup = this.physics.add.group();
  }

  update(time, delta) {
    //update is called 60 times per second
    
    //variable looks for input from the keyboard to move the laser sprite left
    const keyLeftPressed = this.input.keyboard.addKey('LEFT');
    //if statement checks if left key is pressed and moves the sprite accordingly
    if (keyLeftPressed.isDown === true) {
      //moves the laser sprite left on the x-axis
      this.blasterSprite.x -= 5;
      //stopping the sprite from moving off the screen
      if (this.blasterSprite.x < 0) {
        this.blasterSprite.x = 0;
      }
    }

    //same process used to look for input from the keyboard from the right key
    const keyRightPressed = this.input.keyboard.addKey('RIGHT');
    //if statement checks if above variable = true (right key is pressed) and moves laser sprite to the right on the x-axis
    if (keyRightPressed.isDown === true) {
      //moves the laser sprite right on the x-axis
      this.blasterSprite.x += 5;
      //stopping the sprite from moving off the screen
      if (this.blasterSprite.x > 1920) {
        this.blasterSprite.x = 1920;
      }
    }

    //same process used to look for input from the keyboard from the up key
    const keyUpPressed = this.input.keyboard.addKey('UP');
    //if statement checks if above variable = true (up key is pressed) and moves laser up on the y-axis
    if (keyUpPressed.isDown === true) {
      //moves the laser sprite up on the y-axis
      this.blasterSprite.y -= 5;
      //stopping the sprite from moving off the screen
      if (this.blasterSprite.y < 0) {
        this.blasterSprite.y = 0;
      }
    }

    //same process used to look for input from the keyboard from the down key
    const keyDownPressed = this.input.keyboard.addKey('DOWN');
    //if statement checks if above variable = true (down key is pressed) and moves laser down on the x-axis
    if (keyDownPressed.isDown === true) {
      //moves laser sprite down on the y-axis
      this.blasterSprite.y += 5;
      //stopping the sprite from moving off the screen
      if (this.blasterSprite.y > 1080) {
        this.blasterSprite.y = 1080;
      }
    }

    //variable checks for space bar pressed, to fire a "bolt"/missile
    const keySpacePressed = this.input.keyboard.addKey('SPACE');
    //if statement checks if space bar is pressed and fires bolt/missile
    if (keySpacePressed.isDown === true) {
      //checking if a bolt has already lasern fired while the space bar was pressed
      if (this.laserSprite === false) {
        //using a variable to add a bolt/missile each time boolean expression is true
        const addNewLaser = this.physics.add.sprite(this.laserSprite.x, this.laserSprite.y, 'laserSprite').setScale(0.1);
        //adding the new bolt to the group of bolts in the "create" section
        this.laserGroup.add(addNewLaser);
        //adding a sound effect (loaded in the preload section) each time a missile is fired
        this.sound.play('laserSound');
        //changing the fireBolt variable to true, indicating that a missile has lasern fired
        this.laserSprite = true;
      }
    }

    //using another if statement to check if space key is up, so that bolts can be fired multiple times during the game, once for each time the space bar is pressed
    if (keySpacePressed.isUp === true) {
      //resetting the fireBolt variable to false so that a bolt can be fired again the next time the space bar is pressed
      this.laserSprite = false;
    }

    //applying a function to all children (individual bolts) in the group boltGroup
    this.laserGroup.children.each(function (item) {
      //item represents each individual bolt in the group
      //changing the x-value of the bolt on the screen, making it appear to shoot towards the right side of the screen
      item.x = item.x + 15;
      //destroying the bolts after they go off the screen so that they do not take up too much memory on the computer
      if (item.x > 1920) {
        item.destroy();
      }
    })
  }
}

export default gameScene