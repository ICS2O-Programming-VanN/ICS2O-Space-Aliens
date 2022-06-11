/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Phaser Game Menu Scene

// Adds code to Phaser.Scene
class menuScene extends Phaser.Scene {
  
  
  constructor() {
    // Runs Phaser.Scene
    super({key: 'menuScene'});

    // Initializes Variable for the background image
    this.menuSceneBackgroundImage = null;

    // Initializes Variable for Button
    this.startButton = null;
    
    this.gameSceneChange = false

    // Initializes Menu Scene text variable
    this.menuSceneInstructions = null;

    // Initializing a variable to style the text on the Menu Scene
    this.menuSceneInstructionsStyle = {font: '175px Times', fill: '#00ff99', align: 'center'};
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

    // Loads image for button when clicked
    this.load.image('startButtonClicked', './images/startButtonClicked.png');
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
    
    // When the button clicked, call a function
    this.startButton.on('pointerdown', () => this.buttonClicked());
    
    // Creates Instructions on how to play for Menu Scene
    this.menuSceneInstructions = this.add.text(1920 / 2, (10 / 2) + 100, 'Arrow Keys to Move!\nSpacebar to shoot lasers!', this.menuSceneInstructionsStyle).setOrigin(0.50).setScale(0.40);
  }
  
  buttonClicked() {
    this.startButton.setTexture('startButtonClicked')
    this.gameSceneChange = true
  }


  update(time, delta) {
    if (this.gameSceneChange == true) {
      time = 0
      if (time > 100) {
        this.scene.start('gameScene');
      }
    }
   
  }
}

  // Function when start button is clicked


export default menuScene