/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Adds code to Phaser.Scene
class InstructionScene extends Phaser.Scene {
  constructor () {
    
    // Creates object with the key "instructionScene"
    super({ key: 'instructionScene' })

    // Initializes Variable 
    this.instructionSceneBackgroundImage = null
    
    // Initializes Variable 
    this.backButton = null

    //Variables to hold text and text style 
    this.instructionSceneText = null
    this.instructionSceneTextStyle = { font: '27px Times', fill: "#800080", align: 'center' }
    
  }

  init (data) {
    // Initializes Color of Background
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  
  // Loads Images and sound effects
  preload () {

    // Prints what Scene is playing to the console 
    console.log('Instruction Scene')

    // Loads Scene background and back button
    this.load.image('instructionSceneBackground', './images/instructionSceneBackground.jpg')
    this.load.image('backButton', './images/backButton.png')

    // Loads Button Clicked Sound Effect
    this.load.audio("buttonClicked", "./sounds/buttonClickedSoundEffect.mp3")
  }

  
  create (data) {    
   // Displays background
    this.instructionSceneBackgroundImage = this.add.sprite(0, 0, 'instructionSceneBackground').setScale(1)
    // Sets background location
    this.instructionSceneBackgroundImage.x = 1920 / 2
    this.instructionSceneBackgroundImage.y = 1080 / 2
  
    // Displays Instruction text
    this.instructionSceneBodyText = this.add.text(950, 600, `Hey You!\nTake this Blaster that always blasts to the right!\nYou can use Arrow Keys to move upwards, downwards, to the left and the right!\nYou may also use Spacebar to fire lasers!\nDestroy 50 Robots to win!\n You are given 3 health points, if you get hit by a robot, you lose a health point.\nIf you lose all of your health points, you lose!\n Good Luck and Have Fun!!!\n-Van`, this.instructionSceneTextStyle).setOrigin(0.5).setScale(2)
    
    // Displays Back Button
    this.backButton = this.add.sprite(150, 150, 'backButton').setScale(0.4)
    
    // Allows Back Button to be clicked and redirects back to Menu Scene
    this.backButton.setInteractive({ useHandCursor: true })
    this.backButton.on('pointerdown', () => this.clickedButtonBack())
  }
  
  // Function for when the Back Button is Clicked 
  clickedButtonBack () {

    // Plays Button Clicked Sound Effect
    this.sound.play("buttonClicked")    

    // Plays Menu Scene
    this.scene.start('menuScene')
  }
}

export default InstructionScene