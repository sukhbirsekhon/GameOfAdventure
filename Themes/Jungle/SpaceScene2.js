class SpaceScene2 extends Phaser.Scene {
    constructor() {
        super("spacePlay2");
    }
  
   
    create() {
        this.spaceBackground = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "spaceBackground2")
        this.spaceBackground.setOrigin(0,0);

        this.meteors = this.add.group();
  
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
        this.player.setGravity(0,1500);
        this.player.setCollideWorldBounds(true);
  
        this.platforms = this.physics.add.group();
  
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
        this.addPlatformToRandomPlaces();

        this.time.addEvent({
            delay: 1000,
            repeat: 30,
            callback: this.createMeteor,
            callbackScope: this,
        });

        this.time.addEvent({
            delay: 30000,
            callback: this.gameOver,
            callbackScope: this,
        });
  
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
  
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE 0", 16);
        this.counter = 30;
        this.timerText = this.add.text(10, 15, 'Time Left: 30s', { font: "24px Arial", fill: "#ffffff", align: "center" });
    }
  
    update() {
        this.player.scaleX = .5;
        this.player.scaleY = .4;
  
        this.movePlayerManager();
  
        if(this.player.x > this.game.config.width - 30) {
            this.scene.start("play2");
        }
  
        this.physics.add.overlap(this.player, this.coins, this.playCollectCoin, null, this);
        this.physics.add.overlap(this.player, this.meteors, this.meteorHit, null, this);

        if (gameOver){
            return;
        }
  
    }

    meteorHit(player, meteor) {
        gameScore -= 100;
        this.scoreLabel.text = "SCORE " + gameScore;

        this.explosion = this.add.sprite(meteor.body.x, meteor.body.y, "explosion");
        this.explosion.scaleX = 3.50;
        this.explosion.scaleY = 3.50;
        this.explosion.anims.play("explode", true);
        meteor.disableBody(true, true);
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
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('astroLeft', true);
  
        } else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('astroRight', true);
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

    createMeteor() {
        var meteor = this.physics.add.sprite(this.game.config.width + Phaser.Math.Between(60, 600), Phaser.Math.Between(0, this.game.config.height), "meteor");
        meteor.setVelocityX(-200);
        meteor.scaleX = .25;
        meteor.scaleY = .25;

        this.meteors.add(meteor);

        if (this.counter != 0){
            this.counter--;
        }

        this.timerText.setText('Time Left: ' + this.counter + 's');
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
  
    generateHexColor() { 
        return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
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
        this.scene.start("spacePlay1");
    }

    mainMenu() {
        this.scene.start("bootGame");
    }
  
  }
  
  