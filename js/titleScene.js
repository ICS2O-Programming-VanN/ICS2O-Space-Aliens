/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Phaser Game Title Scene

// Adds to Phaser.Scene
class titleScene extends Phaser.Scene {
  constructor() {
    // Runs Phaser.Scene
    super({key: 'titleScene'});
    
    // Initializes title scene image variable
    this.titleSceneBackgroundImage = null;
    
    // Initializes title scene text variable
    this.titleSceneText = null;

    // Initializing a variable to style the text on the title screen
    this.titleSceneTextStyle = {font: '175px Times', fill: '#00ff99', align: 'center'};
  }

  init(data) {
    // Initializes background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    // Displays which Scene is running to console
    console.log("Title Scene");
    
    // Loads Background Image
    this.load.image('titleSceneBackground', './images/titleSceneImage.jpg');
  }

  create(data) {
    // Creates Title Scene Image
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground');
    // Centers Image
    this.titleSceneBackgroundImage.x = 1920 / 2;
    this.titleSceneBackgroundImage.y = 1080 / 2;

    // Creates Title for Title Scene
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 375, 'Blast the Evil Robot!',       this.titleSceneTextStyle).setOrigin(0.5);
  }

  update(time, delta) {
    //changing the amount of time during which this scene is shown
    if (time > 6000) {
      //changing scene to menu scene
      this.scene.switch('menuScene');
    }
  }
}

export default titleScene