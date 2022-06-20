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

    // Initializes Variable for demand to go to the Game Scene 
    this.buttonChangeScene = false
    
    // Initializes Variable for Button
    this.startButton = null;
    
    // Initializes Variable to activate music
    this.musicPlaying = false
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

    // Loads Instruction Button
    this.load.image("instructionsButton", "./images/instructionsButton.png")
    
    // Loads image for button when clicked
    this.load.image('startButtonClicked', './images/startButtonClicked.png');

    // Loads Background music
    this.load.audio("gameBackgroundMusic", "./sounds/gameBackgroundMusic.mp3")

    // Loads Button Cliked Sound Effect
    this.load.audio("buttonClicked", "./sounds/buttonClickedSoundEffect.mp3")
  }

  create(data) {

    // IF statement that checks if music is already playing so it does not repeat
    if (this.musicPlaying === false) {

      // Creates Variable for music
      var music = new Audio("./sounds/gameBackgroundMusic.mp3")

      // Plays the music
      music.play()

      // Loops the music 
      music.loop = true

      // Prevents music playing to repeat and overlap
      this.musicPlaying = true
    }

    
    // Creates background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    
    // Centers background image
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    // Creates image for starting button
    this.startButton = this.add.sprite(1920 / 5, (1080 / 2) + 300, 'start').setScale(0.7);

    // Displays Instruction Buttons
    this.instructionsButton = this.add.sprite(1375, 999, "instructionsButton")


    
    // Allows user to click button
    this.startButton.setInteractive({useHandCursor: true });

    // When the player hovers on the button call function changeColor()
    this.startButton.on('pointerover', () => this.changeColor());

    // When the player is not hovering on the button call function changeColorBack()
    this.startButton.on('pointerout', () => this.changeColorBack());
    // When the button clicked call the Function buttonClicked()
    this.startButton.on('pointerdown', () => this.buttonClicked());
    
    // Allows button to be used when pressed 
    this.instructionsButton.setInteractive({ useHandCursor: true })
    this.instructionsButton.on("pointerdown", () => this.instructionButton())

  }
  
  // Function when start button is clicked
  buttonClicked() {
    // Plays Button Clicked Sound Effect
    this.sound.play("buttonClicked")
    // Plays Game Scene
    this.scene.start('gameScene');
  }

  // Function for when the player is not hovering on the play button
  changeColorBack() {
    // Sets Button Color to Green when not being hovered on
    this.startButton.setTexture('start')
  }
  
  // Function for when the player is hovering on the play button
  changeColor() {
    // Changed Button from Green to Red when Hovered over
    this.startButton.setTexture('startButtonClicked')
  }

  // Function for when instruction Button is clicked
  instructionButton() {
    // Plays Button Cliked Sound Effect
    this.sound.play("buttonClicked")
    // Starts Instruction Scene
    this.scene.start("instructionScene")
  }

  
}

  


export default menuScene