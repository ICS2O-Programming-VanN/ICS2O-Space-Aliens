// Global Phaser

// Scene Import Statements
import SplashScene from "./splashScene.js"

// Creates the New Scenes
const splashScene = new SplashScene()

// Game Scene
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    // Allows arcade games to function
    default: "arcade",
    arcade: {
      // Allows visual of bounding boxes
      debug: true
    }
  },
  // Sets background Color
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    // Centers game to middle of page
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

const game = new Phaser.Game(config)
// console.log(game)

// Load Scenes
game.scene.add("splashScene", splashScene)

// Start Scene
game.scene.start("splashScene")
