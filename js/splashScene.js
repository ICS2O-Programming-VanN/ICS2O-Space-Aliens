//code written below extends (adds to) prewritten code in Phaser.Scene
class splashScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'splashScene'});
    //initializing splashSceneBackgroundImage variable
    this.splashSceneBackgroundImage = null;
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know the scene/file is being properly displayed
    console.log("Splash Scene");
    //giving Phaser access to an image for the splash scene
    //Note: "this" refers to the scene in question (the current scene) and 'splashSceneImage' is the key
    this.load.image('splashScreenImage', './images/splashScreenImage.jpg');
  }

  create(data) {
    //displaying the image (using a variable) loaded in the preload() section
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashScreenImage');
    //centring the background image
    this.splashSceneBackgroundImage.x = 1920 / 2;
    this.splashSceneBackgroundImage.y = 1080 / 2;
  }

  update(time, delta) {
    //changing the amount of time during which this scene is shown
    if (time > 3000) {
      //changing scene to title scene
      this.scene.switch('titleScene');
    }
  }
}

export default splashScene