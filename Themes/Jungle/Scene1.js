class Scene1 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background")
        this.background.setOrigin(0,0)

        this.player = this.physics.add.sprite(20, this.game.config.height - 64, "player");
        this.player.setGravity(0,1000);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update() {
        this.player.scaleX = .35;
        this.player.scaleY = .35;
        this.movePlayerManager();
    }

    movePlayerManager(){
        // this.player.setVelocity(0);
       
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.player.setScale(-.25)

        } else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-200);
            
        }
         else if(this.cursorKeys.down.isDown) {
            this.player.setVelocityY(200);
        }
    }
}
