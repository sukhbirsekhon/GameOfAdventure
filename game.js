window.onload = function() {
    var gameSettings = {
        playerSpeed: 200,
    }
    var config = {
        width: 300, 
        height: 300,
        backgroundColor: 0x000000, 
        scene: [Scene1],
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