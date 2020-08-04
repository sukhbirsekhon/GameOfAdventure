class Scene2 extends Phaser.Scene {
    constructor() {
        super("play2");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background2");
        this.background.setOrigin(0,0);

        this.collectedCoins = 0;

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
        
        this.player = this.physics.add.sprite(20, 500, "player");
        this.player.setGravity(0,1500);
        this.player.setCollideWorldBounds(true);

        this.snakeSound = this.sound.add("snakeSound");
        this.snake = this.physics.add.sprite(880, 500, "snake");
        this.snake.setCollideWorldBounds(true);
        this.snake.setVelocityX(-100);
        this.snake.setBounce(1);
        this.snake.setGravity(0, 1500);

        this.bird = this.physics.add.sprite(200, 255, "bird");
        this.birdSound = this.sound.add("birdSound");
        this.bird.setCollideWorldBounds(true);
        this.bird.setVelocityX(-200);
        this.bird.setBounce(1);

        this.platforms = this.physics.add.group();

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.addPlatformToRandomPlaces();

        this.generateCoins();

        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0,0);
        graphics.lineTo(this.game.config.width, 0);
        graphics.lineTo(this.game.config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0,0);
        graphics.closePath();
        graphics.fillPath();

        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + gameScore, 16);

        this.physics.add.collider(this.snake, this.player, this.enemyHit, null, this);
        this.physics.add.overlap(this.bird, this.player, this.birdHit, null, this);
        this.physics.add.collider(this.platforms, this.snake);
    }

    update() {
        this.player.scaleX = .35;
        this.player.scaleY = .35;

        this.movePlayerManager();

        if(this.player.x > this.game.config.width - 30) {
            this.scene.start("play3");
        }

        this.physics.add.overlap(this.player, this.coins, this.playCollectCoin, null, this);
        

        if (this.collectedCoins == this.coinAmount) {
            var bmpText = this.add.bitmapText(250, 250, 'pixelFont','Level complete!\nProceed to next level ==>',42);
        }

        this.moveSnakeManager();
        this.moveBirdManager();
    }

    movePlayerManager() {
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);

        } else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.anims.stop();
        }
        
        if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
            if(this.player.body.velocity.y == -0) {
                this.player.setVelocityY(-700);
            }
        }
    }

    moveSnakeManager(){
        this.snake.scaleX = .30;
        this.snake.scaleY = .30;
        
        if (this.snake.body.velocity.x == 100) {
            this.snake.anims.play("enemySnakeRev", true);
        } 
        if (this.snake.body.velocity.x == -100) {
            this.snake.anims.play("enemySnake", true);
        }
    }

    moveBirdManager() {
        if (this.bird.body.velocity.x == 200) {
            this.bird.scaleX = .65;
            this.bird.scaleY = .65;
            this.bird.anims.play("birdAnim", true);
        } 
        if (this.bird.body.velocity.x == -200) {
            this.bird.scaleX = .45;
            this.bird.scaleY = .45;
            this.bird.anims.play("birdAnimRev", true);
        }
    }

    addPlatformToRandomPlaces() {
            var plat = this.physics.add.sprite(250, 150, "plat")
            this.platforms.add(plat);
            this.physics.add.collider(this.player, plat);
            plat.scaleX = .45;
            plat.scaleY = .25;
            plat.body.allowGravity = false;
            plat.body.immovable = true;

            var plat1 = this.physics.add.sprite(100, 300, "plat")
            this.platforms.add(plat1);
            this.physics.add.collider(this.player, plat1);
            plat1.scaleX = .45;
            plat1.scaleY = .25;
            plat1.body.allowGravity = false;
            plat1.body.immovable = true;

            var plat2 = this.physics.add.sprite(720, 350, "plat")
            this.platforms.add(plat2);
            this.physics.add.collider(this.player, plat2);
            plat2.scaleX = .45;
            plat2.scaleY = .25;
            plat2.body.allowGravity = false;
            plat2.body.immovable = true;

            var plat3 = this.physics.add.sprite(500, 220, "plat")
            this.platforms.add(plat3);
            this.physics.add.collider(this.player, plat3);
            plat3.scaleX = .45;
            plat3.scaleY = .25;
            plat3.body.allowGravity = false;
            plat3.body.immovable = true;

            var plat4 = this.physics.add.sprite(500, 400, "plat")
            this.platforms.add(plat4);
            this.physics.add.collider(this.player, plat4);
            plat4.scaleX = .45;
            plat4.scaleY = .25;
            plat4.body.allowGravity = false;
            plat4.body.immovable = true;
    }

    playCollectCoin(player, coin) {
        gameScore += 100;
        this.scoreLabel.text = "SCORE " + gameScore;
        this.collectedCoins += 1;

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

        for(var i = 0; i < this.coinAmount; i++) {
            var randomX = Phaser.Math.Between(0, this.game.config.width);

            var coin = this.physics.add.sprite(randomX, 40, "coin");

            this.coins.add(coin);

            coin.setGravity(0,1500);
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

    enemyHit(enemy, player) {
        this.snakeSound.play();
        gameScore -= 10;
        console.log(gameScore);
        this.scoreLabel.text = "SCORE " + gameScore;

        if (enemy.body.x > player.body.x) {
            enemy.body.velocity.x = 100;
        } 
        if (enemy.body.x < player.body.x) {
            enemy.body.velocity.x = -100;
        }
    }

    birdHit(bird, player) {
        this.birdSound.play();
        gameScore -= 10;
        this.scoreLabel.text = "SCORE " + gameScore;

        if(bird.body.x > player.body.x) {
            bird.body.velocity.x = 200;
        }
        if (bird.body.x < player.body.x) {
            bird.body.velocity.x = -200;
        }
    }
}