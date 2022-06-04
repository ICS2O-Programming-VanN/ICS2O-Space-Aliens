/* Global Phaser */

// Copyright (c) 2022 Van Nguyen All rights reserved
//
// Created by Mr. Coxall
// Modified by Van Nguyen
// Created on June 1 2022

// Phaser Configuration File

// Connects to splashScene.js
import SplashScene from "./splashScene.js";
// Connects to titleScene.js
import TitleScene from "./titleScene.js";
// Connects to menuScene.js
import MenuScene from "./menuScene.js";
// Connects to gameScene.js
import GameScene from "./gameScene.js";

// Constants for each game scene
const splashScene = new SplashScene();
const titleScene = new TitleScene();
const menuScene = new MenuScene();
const gameScene = new GameScene();

// Phaser Game configuration for Game
const config = {
  // Type of Game
  type: Phaser.AUTO,
  // Dimensions of Game
  width: 1920,
  height: 1080,
  // Allows Arcade games to be played
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    },
  },
  // Sets background color
  backgroundColor: 0xFFFFFF,
  // Makes it so that the game screen size will shift based of window size
  scale: {
    mode: Phaser.Scale.FIT,
    // Centers background of page
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

const game = new Phaser.Game(config);
console.log(game);

// Loading scenes
game.scene.add('splashScene', splashScene);
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('gameScene', gameScene);

// Beginning Scene
game.scene.start('splashScene');
