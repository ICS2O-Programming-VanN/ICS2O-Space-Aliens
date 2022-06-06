/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Phaser Game Splash Scene

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
    
    // Centers background image
    this.splashSceneBackgroundImage.x = 1920 / 2;
    this.splashSceneBackgroundImage.y = 1080 / 2;
  }

  update(time, delta) {
    // Determines the amount of time the Splash Screen is shown
    if (time > 4500) {
      // Changes Scene to Title Scene
      this.scene.switch('titleScene');
    }
  }
}

export default splashScene