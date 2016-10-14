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

    //  Player
    player = group.create(40, 40, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.setSize(16, 16, 0, 0);
    this.game.camera.follow(player);

    // enemy
    enemy = group.create(185, 70, 'enemy');

    this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.setSize(16, 16, 0, 0);
    enemy.body.velocity = 0;
    enemy.body.moves = false;
    enemy.body.immovable = true;



    cursors = this.game.input.keyboard.createCursorKeys();
    keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

    /* use endgame function eventually
    this.endGameTimer = this.game.time.create();
    this.endGameTimer.add(Phaser.Timer.SECOND * 15, this.endGame,this);
    this.endGameTimer.start(); */


    // fuck this noise -- use layer2 on tilemap, eventually
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

    player.body.velocity.set(0);
    this.game.debug.body(player);
    this.game.debug.body(enemy);
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

    this.game.physics.arcade.collide(player, layer);
    this.game.physics.arcade.collide(enemy, layer);
    this.game.physics.arcade.collide(player, enemy, this.startBattle, null, this);

    group.sort('y', Phaser.Group.SORT_DESCENDING);

  }

  startBattle(player, enemy) {
    this.game.state.start('battle');
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
