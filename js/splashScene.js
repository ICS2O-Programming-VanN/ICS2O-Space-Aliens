// Global Phaser

// Splash Screen Class
class SplashScene extends Phaser.Scene {

  // This method is the construtor.
  constructor() {
    super({ key: "splashScene" })
  }

    @param {object} data

  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  preload() {
    console.log("Splash Scene")
  }

    @param {object}

  create(data) {
    
  }

    @param {number} time
    @param {number} delta

  update(time, delta) {
    
  }
  


  
}

export default SplashScene