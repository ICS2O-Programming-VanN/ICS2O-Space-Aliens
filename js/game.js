/* global Phaser */

//link to splashScene.js
import SplashScene from "./splashScene.js";
//link to titleScene.js
import TitleScene from "./titleScene.js";
//link to menuScene.js
import MenuScene from "./menuScene.js";
//link to gameScene.js
import GameScene from "./gameScene.js";

//creating constants to 'hold' the scene files
const splashScene = new SplashScene();
const titleScene = new TitleScene();
const menuScene = new MenuScene();
const gameScene = new GameScene();

//using a constant to set up the basic Phaser game
const config = {
  //type of game
  type: Phaser.AUTO,
  //dimensions of screen
  width: 1920,
  height: 1080,
  //setup so default arcade games can be played
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    },
  },
  //settings for background
  backgroundColor: 0xFFFFFF,
  //making scale of background change when screen/window size changes
  scale: {
    mode: Phaser.Scale.FIT,
    //centring the background on the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

const game = new Phaser.Game(config);
console.log(game);

//loading scenes
game.scene.add('splashScene', splashScene);
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('gameScene', gameScene);

//starting scene
game.scene.start('splashScene');
