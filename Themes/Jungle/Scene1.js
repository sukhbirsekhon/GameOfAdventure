class Scene1 extends Phaser.Scene {
    constructor() {
        super("play1");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background")
        this.background.setOrigin(0,0);

        this.coin = this.add.sprite(40, 40, "coin");
        
        this.player = this.physics.add.sprite(20, 500, "player");
        this.player.setGravity(0,1500);
        this.player.setCollideWorldBounds(true);

        this.platforms = this.physics.add.group();

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.addPlatformToRandomPlaces();

    }

    update() {
        this.player.scaleX = .35;
        this.player.scaleY = .35;

        this.movePlayerManager();

        if(this.player.x > this.game.config.width - 30) {
            this.scene.start("play2");
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
        
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-330);
        }
    }

    addPlatformToRandomPlaces() {
            var plat = this.physics.add.sprite(250, 150, "plat")
            this.platforms.add(plat)
            this.physics.add.collider(this.player, plat);
            plat.scaleX = .45;
            plat.scaleY = .45;
            plat.body.allowGravity = false;
            plat.body.immovable = true;

            var plat1 = this.physics.add.sprite(100, 300, "plat")
            this.platforms.add(plat1)
            this.physics.add.collider(this.player, plat1);
            plat1.scaleX = .45;
            plat1.scaleY = .45;
            plat1.body.allowGravity = false;
            plat1.body.immovable = true;

            var plat2 = this.physics.add.sprite(720, 350, "plat")
            this.platforms.add(plat2)
            this.physics.add.collider(this.player, plat2);
            plat2.scaleX = .45;
            plat2.scaleY = .45;
            plat2.body.allowGravity = false;
            plat2.body.immovable = true;

            var plat3 = this.physics.add.sprite(500, 220, "plat")
            this.platforms.add(plat3)
            this.physics.add.collider(this.player, plat3);
            plat3.scaleX = .45;
            plat3.scaleY = .45;
            plat3.body.allowGravity = false;
            plat3.body.immovable = true;

            var plat4 = this.physics.add.sprite(500, 400, "plat")
            this.platforms.add(plat4)
            this.physics.add.collider(this.player, plat4);
            plat4.scaleX = .45;
            plat4.scaleY = .45;
            plat4.body.allowGravity = false;
            plat4.body.immovable = true;
    }
}

