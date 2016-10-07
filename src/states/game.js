import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';
// better way to do this??
var keyA,
    keyS,
    keyD,
    keyW,
    player,
    enemy,
    map,
    layer,
    cursors;

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {

    this.game.stage.backgroundColor = 0x000d1a;

    var data = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n1,6,6,6,1,6,6,1,1,6,6,6,1,6,6,1\n1,6,1,6,1,6,6,6,1,6,6,6,1,6,6,1\n1,6,6,6,6,6,6,6,6,6,1,6,6,6,6,1\n1,6,1,1,1,6,1,1,6,6,1,1,1,6,6,1\n1,6,6,6,6,6,6,6,6,6,6,6,1,6,6,1\n1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1';

      //  Add data to the cache
      this.game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);

      //  Create our map
      map = this.game.add.tilemap('dynamicMap', 32, 32);

      //  'tiles' = cache image key, 16x16 = tile size
      map.addTilesetImage('tiles', 'tiles', 32, 32);
      map.setCollisionBetween(1, 2);
      //  0 is important
      layer = map.createLayer(0);
      layer.resizeWorld();
      // uncomment below to see map collision data
      //layer.debug = true;

      //  Player
      player = this.game.add.sprite(40, 40, 'player', 1);
      player.animations.add('left', [8,9], 10, true);
      player.animations.add('right', [1,2], 10, true);
      player.animations.add('up', [11,12,13], 10, true);
      player.animations.add('down', [4,5,6], 10, true);

      // enemy
      enemy = this.game.add.sprite(100, 100, 'enemy');
      this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
      this.game.physics.enable(player, Phaser.Physics.ARCADE);
      player.body.setSize(10, 14, 2, 1);
      this.game.camera.follow(player);

      cursors = this.game.input.keyboard.createCursorKeys();
      keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
      keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

    /*setup a timer to end the game
    this.endGameTimer = this.game.time.create();
    this.endGameTimer.add(Phaser.Timer.SECOND * 15, this.endGame,this);
    this.endGameTimer.start(); */
  }

  update() {
    this.game.physics.arcade.collide(player, layer);
    this.game.physics.arcade.collide(player, enemy);
    this.game.physics.arcade.collide(enemy, layer);
    player.body.velocity.set(0);
    enemy.body.velocity.set(0);

    if (cursors.left.isDown || keyA.isDown)
      {
          player.body.velocity.x = -100;
          player.play('left');
      }
      else if (cursors.right.isDown || keyD.isDown)
      {
          player.body.velocity.x = 100;
          player.play('right');
      }
      else if (cursors.up.isDown || keyW.isDown)
      {
          player.body.velocity.y = -100;
          player.play('up');
      }
      else if (cursors.down.isDown || keyS.isDown)
      {
          player.body.velocity.y = 100;
          player.play('down');
      }
      else
      {
          player.animations.stop();
      }
    }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
