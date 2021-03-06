class SpaceScene1 extends Phaser.Scene {
    constructor() {
        super("spacePlay1");
    }


    create() {
        this.spaceBackground = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "spaceBackground")
        this.spaceBackground.setOrigin(0, 0);

        this.collectedCoinsInSpace = 0;

        var musicConfig = {
            mute: false,
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.backgroundSound = this.sound.add("backgroundSound");
        this.backgroundSound.play(musicConfig);

        this.coinSound = this.sound.add("coinSound");
        this.coins = this.physics.add.group();

        this.player = this.physics.add.sprite(20, 500, "astronaut");
        this.player.setGravity(0, 1500);
        this.player.setCollideWorldBounds(true);

        this.platforms = this.physics.add.group();

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.addPlatformToRandomPlaces();

        this.generateCoins();

        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(this.game.config.width, 0);
        graphics.lineTo(this.game.config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE 0", 16);
        this.score = 0;
    }

    update() {
        this.player.scaleX = .5;
        this.player.scaleY = .4;

        this.movePlayerManager();

        if (this.player.x > this.game.config.width - 50) {
            this.scene.start("spacePlay2");
        }

        this.physics.add.overlap(this.player, this.coins, this.playCollectCoin, null, this);


        if (this.collectedCoinsInSpace == this.coinAmount) {
            var bmpText = this.add.bitmapText(250, 250, 'pixelFont', 'Level complete!\nProceed to next level ==>', 42);
        }

    }

    addPlatformToRandomPlaces() {
        var plat = this.physics.add.sprite(250, 150, "spacePlatform")
        this.platforms.add(plat);
        this.physics.add.collider(this.player, plat);
        plat.scaleX = .1;
        plat.scaleY = .05;
        plat.body.allowGravity = false;
        plat.body.immovable = true;

        var plat1 = this.physics.add.sprite(100, 300, "spacePlatform")
        this.platforms.add(plat1);
        this.physics.add.collider(this.player, plat1);
        plat1.scaleX = .1;
        plat1.scaleY = .05;
        plat1.body.allowGravity = false;
        plat1.body.immovable = true;

        var plat2 = this.physics.add.sprite(720, 350, "spacePlatform")
        this.platforms.add(plat2);
        this.physics.add.collider(this.player, plat2);
        plat2.scaleX = .1;
        plat2.scaleY = .05;
        plat2.body.allowGravity = false;
        plat2.body.immovable = true;

        var plat3 = this.physics.add.sprite(500, 220, "spacePlatform")
        this.platforms.add(plat3);
        this.physics.add.collider(this.player, plat3);
        plat3.scaleX = .1;
        plat3.scaleY = .05;
        plat3.body.allowGravity = false;
        plat3.body.immovable = true;

        var plat4 = this.physics.add.sprite(500, 400, "spacePlatform")
        this.platforms.add(plat4);
        this.physics.add.collider(this.player, plat4);
        plat4.scaleX = .1;
        plat4.scaleY = .05;
        plat4.body.allowGravity = false;
        plat4.body.immovable = true;
    }

    movePlayerManager() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('astroLeft', true);

        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('astroRight', true);
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.anims.stop();
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            if (this.player.body.velocity.y == -0) {
                this.player.setVelocityY(-700);
            }
        }
    }

    playCollectCoin(player, coin) {
        gameScore += 100;
        this.scoreLabel.text = "SCORE " + gameScore;
        this.collectedCoinsInSpace += 1;

        coin.disableBody(true, true);
        var musicConfig = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.coinSound.play(musicConfig);
    }

    generateCoins() {
        this.coinAmount = Math.floor(Math.random() * 10) + 5;

        for (var i = 0; i < this.coinAmount; i++) {
            var randomX = Phaser.Math.Between(0, this.game.config.width);

            var coin = this.physics.add.sprite(randomX, 40, "coin");

            this.coins.add(coin);

            coin.setGravity(0, 1500);
            coin.setCollideWorldBounds(true);
            coin.anims.play('rot', true);
            coin.scaleX = .35;
            coin.scaleY = .35;
            this.physics.add.collider(coin, this.platforms);

        }
    }

    generateHexColor() {
        return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
    }

}

