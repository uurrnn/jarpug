class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {
    this.game.load.image('tiles', '/assets/tiles.png');
    this.game.load.image('enemy', '/assets/alien.png');
    this.game.load.spritesheet('bldgs', '/assets/bldgs.png', 32, 64);
    this.game.load.spritesheet('player', '/assets/spaceman.png', 16, 16);
    this.game.load.tilemap('mapOtiles', '/assets/tiles.json', null, Phaser.Tilemap.TILED_JSON);
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
