class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {

    this.game.stage.backgroundColor = 0x000d1a;

    this.menuText = this.add.text(this.game.world.centerX,this.game.world.centerY, 'Click to play', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    this.menuText.anchor.set(0.5);

    this.input.onDown.add(this.onInputDown, this);
    this.canContinueToNextState = true;
  }

  update() {}

  onInputDown () {
    if( ! this.canContinueToNextState){
      return;
    }
    this.canContinueToNextState = false;
    this.menuText.visible = false;
    this.game.state.start('game');
  }

}

export default Menu;
