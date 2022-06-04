// Adds code to Phaser.Scene
class splashScene extends Phaser.Scene {
  constructor() {
    // Runs Phaser.Scene
    super({key: 'splashScene'});
    // Initializes splashSceneBackgroundImage Variable
    this.splashSceneBackgroundImage = null;
  }

  init(data) {
    // Initializes background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    // Displays the Scene being played (in console)
    console.log("Splash Scene");
    
    // Loads Splash Screen Image for Phaser
    this.load.image('splashScreenImage', './images/splashScreenImage.jpg');
  }

  create(data) {
    // Displays image loaded in preload()
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashScreenImage');
    
    // Centeres background image
    this.splashSceneBackgroundImage.x = 1920 / 2;
    this.splashSceneBackgroundImage.y = 1080 / 2;
  }

  update(time, delta) {
    // Determines the amount of time the Splash Screen is shown
    if (time > 3000) {
      // Changes Scene to Title Scene
      this.scene.switch('titleScene');
    }
  }
}

export default splashScene