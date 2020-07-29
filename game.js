window.onload = function() {
    var gameSettings = {
        playerSpeed: 200,
    }
    var config = {
        width: 900, 
        height: 500,
        backgroundColor: 0x000000, 
        scene: [Welcome, Scene1],
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    }
    var game = new Phaser.Game(config);
    
}