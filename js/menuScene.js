/* Global Phaer */

// Adds code to Phaser.Scene
class menuScene extends Phaser.Scene {
  constructor() {
    // Runs Phaser.Scene
    super({key: 'menuScene'});

    // Initializes Variable for the background image
    this.menuSceneBackgroundImage = null;

    // Initializes Variable for Button
    this.startButton = null;
  }

  init(data) {
    // Initializes background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {

    // Shows what scene is being played (in console)
    console.log("Menu Scene");

    // Loads background image
    this.load.image('menuSceneBackground', './images/menuSceneBackground.jpg');

    // Loads image for button
    this.load.image('start', './images/startButton.png');
  }

  create(data) {
    // Creates background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    // Centers background image
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    // Creates image for starting button
    this.startButton = this.add.sprite(1920 / 5, (1080 / 2) + 300, 'start').setScale(0.8);
    // Allows user to click button
    this.startButton.setInteractive({useHandCursor: true });
    //when button clicked, call a function
    this.startButton.on('pointerdown', () => this.buttonClicked());
  }

  update(time, delta) {
    // TBD
  }

  // Function when start button is clicked
  buttonClicked() {
    this.scene.start('gameScene');
  }
}

export default menuScene