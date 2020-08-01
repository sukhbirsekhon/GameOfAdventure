class Welcome extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "assets/images/JungleTheme/jungleBack.jpg")
        this.load.image("background2", "assets/images/JungleTheme/jungleBack2.jpg")
        this.load.image("background3", "assets/images/JungleTheme/jungleBack3.jpg")
        this.load.image("plat", "assets/images/JungleTheme/platform1.png");
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.audio("coinSound", "assets/sound/Coin-Sound.mp3");
        this.load.audio("backgroundSound", "assets/sound/Background-Sound.wav");

        this.load.spritesheet("player", "spritesheets/Character/character.png", {
            frameWidth: 168,
            frameHeight: 216
        });

        this.load.spritesheet("playerRev", "spritesheets/Character/characterRev.png", {
            frameWidth: 168,
            frameHeight: 216
        });

        this.load.spritesheet("coin", "spritesheets/Coins/coins.png", {
            frameWidth: 100,
            frameHeight: 100
        });
    }

    create() {
        this.add.text(20, 20, "Welcome to GAME OF ADVENTURE!");
        this.add.text(20, 80, "Press Spacebar to start the game...");
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerRev', { start: 4, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'rot',
            frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
         this.scene.start("play1");
        }
    }
}