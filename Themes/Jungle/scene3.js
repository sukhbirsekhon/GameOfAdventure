class Scene3 extends Phaser.Scene {
    constructor() {
        super("play3");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background3")
        this.background.setOrigin(0,0)
        
        this.fireballs = this.add.group();

        this.snakeSound = this.sound.add("snakeSound");
        this.snake = this.physics.add.sprite(880, 500, "snake");
        this.snake.setCollideWorldBounds(true);
        this.snake.setVelocityX(-100);
        this.snake.setBounce(1);
        this.snake.setGravity(0, 1500);

        this.bird = this.physics.add.sprite(200, 100, "bird");
        this.birdSound = this.sound.add("birdSound");
        this.bird.setCollideWorldBounds(true);
        this.bird.setVelocityX(-200);
        this.bird.setBounce(1);

        this.player = this.physics.add.sprite(50, this.game.config.height - 64, "player");
        this.player.setGravity(0,1500);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.platforms = this.physics.add.group();
        this.addPlatformToRandomPlaces();

        this.time.addEvent({
            delay: 1000,
            repeat: 30,
            callback: this.createFireball,
            callbackScope: this,
        });

        this.time.addEvent({
            delay: 30000,
            callback: this.gameOver,
            callbackScope: this,
        });

        this.coinSound = this.sound.add("coinSound");
        this.coins = this.physics.add.group();

        this.time.addEvent({
            delay: 500,
            repeat: 60,
            callback: this.createCoin,
            callbackScope: this,
        });

        this.time.addEvent({
            delay: 20000,
            callback: this.removeCoin,
            callbackScope: this,
        });

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
        this.counter = 30;
        this.timerText = this.add.text(10, 15, 'Time Left: 30s', { font: "24px Arial", fill: "#ffffff", align: "center" });
        // this.timerText.anchor.setOrigin(0.5, 0.5);

        // this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

        this.physics.add.collider(this.snake, this.player, this.enemyHit, null, this);
        this.physics.add.overlap(this.bird, this.player, this.birdHit, null, this);
        this.physics.add.collider(this.platforms, this.snake);
    }
    update() {
        this.player.scaleX = .35;
        this.player.scaleY = .35;

        this.movePlayerManager();
        
        this.physics.add.overlap(this.player, this.coins, this.playCollectCoin, null, this);
        this.physics.add.overlap(this.player, this.fireballs, this.fireballHit, null, this);

        if (gameOver){
            return;
        }

        this.moveSnakeManager();
        this.moveBirdManager();
    }

    fireballHit(player, fireball) {
        gameScore -= 100;
        this.scoreLabel.text = "SCORE " + gameScore;

        this.explosion = this.add.sprite(fireball.body.x, fireball.body.y, "explosion");
        this.explosion.scaleX = 3.50;
        this.explosion.scaleY = 3.50;
        this.explosion.anims.play("explode", true);
        fireball.disableBody(true, true);
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

    enemyHit(enemy, player) {
        this.snakeSound.play();
        gameScore -= 10;
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

    createFireball() {
        var fireball = this.physics.add.sprite(this.game.config.width + Phaser.Math.Between(60, 600), Phaser.Math.Between(0, this.game.config.height), "fireball");
        fireball.setVelocityX(-200);
        fireball.scaleX = .25;
        fireball.scaleY = .25;

        this.fireballs.add(fireball);

        if (this.counter != 0){
            this.counter--;
        }

        this.timerText.setText('Time Left: ' + this.counter + 's');
    }

    createCoin() {
        var coin = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), 0, "coin");
        this.coins.add(coin);

        coin.setGravity(0,1500);
        coin.setCollideWorldBounds(true);
        coin.anims.play('rot', true);
        coin.scaleX = .35;
        coin.scaleY = .35;
        this.physics.add.collider(coin, this.platforms)
    }

    removeCoin(coin) {
        // this.coins.getChildren([0]).disableBody();
    }

    gameOver() {
        this.physics.pause();
        gameOver = true;
        
        this.add.bitmapText(250, 250, 'pixelFont','Game Over!',42);
        
        this.resetButton = this.add.text(250, 300, 'Restart Game', { fill: '#FF0000', fontSize: '42px'}).setInteractive().on('pointerdown', () => this.resetGame() ).on('pointerover', () => this.resetButton.setStyle({ fill: '#ff0'}) ).on('pointerout', () =>  this.resetButton.setStyle({ fill: '#FF0000' }) );

        this.mainMenuButton = this.add.text(250, 350, 'Main Menu', { fill: '#FF0000', fontSize: '42px'}).setInteractive().on('pointerdown', () => this.mainMenu() ).on('pointerover', () => this.mainMenuButton.setStyle({ fill: '#ff0'}) ).on('pointerout', () =>  this.mainMenuButton.setStyle({ fill: '#FF0000' }) );
    }

    resetGame() {
        gameScore = 0;
        gameOver = false;
        this.scene.start("play1");
    }

    mainMenu() {
        this.scene.start("bootGame");
    }

    // updateCounter() {

    //     this.counter--;
    
    //     this.timerText.setText('Counter: ' + this.counter);
    
    // }
}