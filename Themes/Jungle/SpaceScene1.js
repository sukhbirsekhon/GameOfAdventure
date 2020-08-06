class SpaceScene1 extends Phaser.Scene {
  constructor() {
      super("spacePlay1");
  }

 
  create() {
      this.spaceBackground = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "spaceBackground")
      this.spaceBackground.setOrigin(0,0);

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
      
      this.player = this.physics.add.sprite(20, 500, "player");
      this.player.setGravity(0,1500);
      this.player.setCollideWorldBounds(true);

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

      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE 0", 16);
      this.score = 0;
  }

  update() {
      this.player.scaleX = .35;
      this.player.scaleY = .35;

      this.movePlayerManager();

      if(this.player.x > this.game.config.width - 30) {
          this.scene.start("play2");
      }

      this.physics.add.overlap(this.player, this.coins, this.playCollectCoin, null, this);
      

      if (this.collectedCoinsInSpace == this.coinAmount) {
          var bmpText = this.add.bitmapText(250, 250, 'pixelFont','Level complete!\nProceed to next level ==>',42);
      }

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

  addPlatformToRandomPlaces() {
    var spacePlat1 = this.physics.add.sprite(300, 180, "spacePlat")
    this.platforms.add(spacePlat1);
    this.physics.add.collider(this.player, spacePlat1);
    spacePlat1.scaleX = .30;
    spacePlat1.scaleY = .15;
    spacePlat1.body.allowGravity = false;
    spacePlat1.body.immovable = true;

    var spacePlat2 = this.physics.add.sprite(720, 280, "spacePlat")
    this.platforms.add(spacePlat2);
    this.physics.add.collider(this.player, spacePlat2);
    spacePlat2.scaleX = .30;
    spacePlat2.scaleY = .15;
    spacePlat2.body.allowGravity = false;
    spacePlat2.body.immovable = true;

    var spacePlat3 = this.physics.add.sprite(400, 400, "spacePlat")
    this.platforms.add(spacePlat3);
    this.physics.add.collider(this.player, spacePlat3);
    spacePlat3.scaleX = .30;
    spacePlat3.scaleY = .15;
    spacePlat3.body.allowGravity = false;
    spacePlat3.body.immovable = true;
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

}

