import Phaser from 'phaser'

const eventsCenter = new Phaser.Events.EventEmitter()

export default eventsCenter

import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

	// don't forget to import eventsCenter in the UIScene
	import eventsCenter from './EventsCenter'

	create()
	{
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "Score: 0", 16);
        
		//this.scoreLabel = this.add.text(10, 10, 'Count: 0', {
		//	fontSize: 32
		//})

		// listen to 'update-count' event and call `updateCount()`
		// when it fires
		eventsCenter.on('update-count', this.updateCount, this)

		// clean up when Scene is shutdown
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			eventsCenter.off('update-count', this.updateCount, this)
		})
	}

	updateCount(score)
	{
		this.scoreLabel.text = `Score: ${score}`
	}
}