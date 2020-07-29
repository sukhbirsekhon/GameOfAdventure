class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "assets/images/JungleTheme/jungle1.png")
    }

    create() {
        this.background = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height, "background")
        this.background.setOrigin(0,0)
    }
}