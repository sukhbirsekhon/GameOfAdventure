class Scene2 extends Phaser.Scene {
    constructor() {
        super("play2");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background2")
        this.background.setOrigin(0,0)

        this.player = this.physics.add.sprite(50, this.game.config.height - 64, "player");
        this.player.setGravity(0,1500);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update() {
        this.player.scaleX = .35;
        this.player.scaleY = .35;

        this.movePlayerManager();

        if(this.player.x > this.game.config.width - 30) {
            this.scene.start("play3");
        }
    }

    movePlayerManager(){
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
}