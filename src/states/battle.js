
var player,
    enemy,
    background;

class Battle extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    background = this.game.add.tileSprite(0, 0, 800, 480, 'battleBG');
    player = this.add.sprite(200, 220, 'player', 1);
    enemy = this.add.sprite(600, 220, 'enemy');
  }

  update() {

  }

}

export default Battle;
