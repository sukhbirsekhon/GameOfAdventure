class Welcome extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "assets/images/JungleTheme/jungleBack.jpg")
        this.load.image("background2", "assets/images/JungleTheme/jungleBack6.jpg")
        this.load.image("background3", "assets/images/JungleTheme/jungleBack3.jpg")
        this.load.image("plat", "assets/images/JungleTheme/platform1.png");
        this.load.image("fireball", "assets/images/JungleTheme/fireBall.png");
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.audio("coinSound", "assets/sound/Coin-Sound.mp3");
        this.load.audio("backgroundSound", "assets/sound/Background-Sound.wav");
        this.load.audio("snakeSound", "assets/sound/snake.mp3");
        this.load.audio("birdSound", "assets/sound/bird.mp3");

        this.load.image("spaceBackground", "assets/images/SpaceTheme/spaceBack.jpg");
        this.load.image("spacePlat", "assets/images/SpaceTheme/spacePlatform.png");

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

        this.load.spritesheet("snake", "assets/images/JungleTheme/snakes.png", {
            frameWidth: 211,
            frameHeight: 235
        });

        this.load.spritesheet("snakeRev", "assets/images/JungleTheme/snake-rev.png", {
            frameWidth: 211,
            frameHeight: 235
        });

        this.load.spritesheet("bird", "assets/images/JungleTheme/bird.png", {
            frameWidth: 116,
            frameHeight: 110
        });

        this.load.spritesheet("birdRev", "assets/images/JungleTheme/birdRev.png", {
            frameWidth: 190,
            frameHeight: 166
        });

        this.load.spritesheet("explosion", "spritesheets/Explosion/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
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
        
        this.anims.create({
            key: 'enemySnake',
            frames: this.anims.generateFrameNumbers('snake', {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemySnakeRev',
            frames: this.anims.generateFrameNumbers('snakeRev', {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'birdAnim',
            frames: this.anims.generateFrameNumbers('bird', {start: 0, end: 13}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'birdAnimRev',
            frames: this.anims.generateFrameNumbers('birdRev', {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
         this.scene.start("spacePlay1");
        }
    }
}