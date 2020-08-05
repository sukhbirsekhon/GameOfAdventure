var gameSettings = {
    playerSpeed: 200,
}
var gameScore = 0;
var config = {
    width: 900, 
    height: 500,
    backgroundColor: 0x000000, 
    scene: [Welcome, Scene1, Scene2, Scene3],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            // gravity: { y: 300 },
            debug: false
        }
    }
}
var gameOver = false;
    var game = new Phaser.Game(config);