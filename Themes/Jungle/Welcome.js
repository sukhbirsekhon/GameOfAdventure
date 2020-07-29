class Welcome extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "assets/images/JungleTheme/jungleBack.jpg")

        this.load.spritesheet("player", "assets/images/Character/character.png", {
            frameWidth: 168,
            frameHeight: 216
        });
    }

    create() {
        this.add.text(20, 20, "Welcome to GAME OF ADVENTURE!");
        this.add.text(20, 80, "Press Spacebar to start the game...");
        
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers(
                "player", {start: 0,end:4}
            ),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
         this.scene.start("playGame");
        }
    }
}