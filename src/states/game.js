// better way to do this??
var keyA,
    keyS,
    keyD,
    keyW,
    player,
    enemy,
    map,
    layer,
    cursors,
    group,
    tileset,
    mapIndex,
    oldY = 0,
    locs = [];

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {

    this.game.stage.backgroundColor = 0x000d1a;

    //  Create our map
    map = this.game.add.tilemap('mapOtiles');
    map.addTilesetImage('tiles');

    layer = map.createLayer('One');
    layer.resizeWorld();
    map.setCollisionBetween(2, 2, 'One');
    // uncomment below to see map collision data
    //layer.debug = true;

    group = this.game.add.group();
    //  Create some trees, each in a unique location
    /*for (var i = 0; i < 2; i++)
    {
      do {
          var x = this.game.math.snapTo(this.game.world.randomX, 32) / 32;
          var y = this.game.math.snapTo(this.game.world.randomY, 32) / 32;

          if (y > 17)
          {
              y = 17;
          }

          var idx = (y * 17) + x;
      }
      while (locs.indexOf(idx) !== -1)

      locs.push(idx);

      group.create(x * 32, y * 32, 'bldgs', 0);
    }*/

    //  Player
    player = group.create(40, 40, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    // enemy
    enemy = group.create(175, 70, 'enemy');
    this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.setSize(16, 16, 0, 0);
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


    group.create(64,32,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(96,96,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(128,96,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(192,96,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(224,96,'bldgs', this.game.rnd.integerInRange(0, 4));

    group.create(32,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(64,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(96,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(128,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(160,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(192,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(224,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(256,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(288,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(320,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(352,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(384,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(416,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(448,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(480,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(512,160,'bldgs', this.game.rnd.integerInRange(0, 4));
    group.create(544,160,'bldgs', this.game.rnd.integerInRange(0, 4));

    group.sort();
  }

  update() {
    this.game.physics.arcade.collide(player, layer);
    this.game.physics.arcade.collide(player, enemy);
    this.game.physics.arcade.collide(enemy, layer);
    player.body.velocity.set(0);
    enemy.body.velocity.set(0);

    if (cursors.left.isDown || keyA.isDown)
      {
          player.body.velocity.x = -200;
          player.play('left');
          if (keyW.isDown || cursors.up.isDown) {
            player.body.velocity.y = -200;
          }
          else if (keyS.isDown || cursors.down.isDown) {
            player.body.velocity.y = 200;
          }
      }
      else if (cursors.right.isDown || keyD.isDown)
      {
          player.body.velocity.x = 200;
          player.play('right');
          if (keyW.isDown || cursors.up.isDown) {
            player.body.velocity.y = -200;
          }
          else if (keyS.isDown || cursors.down.isDown) {
            player.body.velocity.y = 200;
          }
      }
      else if (cursors.up.isDown || keyW.isDown)
      {
          player.body.velocity.y = -200;
          player.play('up');
      }
      else if (cursors.down.isDown || keyS.isDown)
      {
          player.body.velocity.y = 200;
          player.play('down');
      }
      else
      {
          player.animations.stop();
      }

      group.sort('y', Phaser.Group.SORT_DESCENDING);

    }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
