class Welcome extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background0", "assets/titleScreen/LoadingBackground.png");
        this.load.image("background", "assets/images/JungleTheme/jungleBack.jpg");
        this.load.image("background2", "assets/images/JungleTheme/jungleBack6.jpg");
        this.load.image("background3", "assets/images/JungleTheme/jungleBack3.jpg");
        this.load.image("gameTitle", "assets/titleScreen/GameTitle.png");
        this.load.image("jungleTitleBackground", "assets/titleScreen/cartoonJungleBackground.png");
        this.load.image("spaceTitleBackground", "assets/titleScreen/cartoonJungleBackground.png");

        this.load.image("plat", "assets/images/JungleTheme/platform1.png");
        this.load.image("fireball", "assets/images/JungleTheme/fireBall.png");

        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        this.load.audio("coinSound", "assets/sound/Coin-Sound.mp3");
        this.load.audio("backgroundSound", "assets/sound/Background-Sound.wav");
        this.load.audio("snakeSound", "assets/sound/snake.mp3");
        this.load.audio("birdSound", "assets/sound/bird.mp3");

        this.load.image("spacePlatform", "assets/images/SpaceTheme/spacePlatform4.png");
        this.load.image("spaceBackground", "assets/images/SpaceTheme/spaceBack.jpg");
        this.load.image("spaceBackground2", "assets/images/SpaceTheme/spaceBack2.jpg");
        this.load.image("meteor", "assets/images/SpaceTheme/meteor.png");

        this.load.image("cloud", "assets/images/JungleTheme/cloud.png");
        this.load.image("rain", "assets/images/JungleTheme/rain.png");

        this.load.spritesheet("player", "spritesheets/Character/character.png", {
            frameWidth: 168,
            frameHeight: 216
        });

        this.load.spritesheet("playerRev", "spritesheets/Character/characterRev.png", {
            frameWidth: 168,
            frameHeight: 216
        });

        this.load.spritesheet("astronaut", "spritesheets/Character/astronaut.png", {
            frameWidth: 120,
            frameHeight: 160
        });

        this.load.spritesheet("astronautRev", "spritesheets/Character/astronautRev.png", {
            frameWidth: 120,
            frameHeight: 160
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

        this.load.spritesheet("explosion", "spritesheets/Explosion/explosion.png", {
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background0")
        this.background.setOrigin(0, 0);
        this.gameTitle = this.add.image(450, 100, "gameTitle");
        this.jungleBackground = this.add.image(300, 300, "jungleTitleBackground").setInteractive().on('pointerdown', () => this.startJungle())
        this.spaceTitleBackground = this.add.image(600, 300, "spaceTitleBackground").setInteractive().on('pointerdown', () => this.startSpace())

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.createAnimations();
    }

    update() {
        this.jungleBackground.scaleX = .25;
        this.jungleBackground.scaleY = .25;

        this.spaceTitleBackground.scaleX = .25;
        this.spaceTitleBackground.scaleY = .25;

    }

    startJungle() {
        this.scene.start("play1");
    }

    startSpace() {
        this.scene.start("spacePlay1");
    }

    createAnimations() {
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
            key: 'astroRight',
            frames: this.anims.generateFrameNumbers('astronaut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'astroLeft',
            frames: this.anims.generateFrameNumbers('astronautRev', { start: 4, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'rot',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemySnake',
            frames: this.anims.generateFrameNumbers('snake', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemySnakeRev',
            frames: this.anims.generateFrameNumbers('snakeRev', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'birdAnim',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'birdAnimRev',
            frames: this.anims.generateFrameNumbers('birdRev', { start: 0, end: 9 }),
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
    }
}