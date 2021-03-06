 import Boot from './states/boot';
 import Game from './states/game';
 import Battle from './states/battle';
 import Menu from './states/menu';
 import Preloader from './states/preloader';
 import Gameover from './states/gameover';


const game = new Phaser.Game(800, 480, Phaser.AUTO, 'japurg-game');

 game.state.add('boot', new Boot());
 game.state.add('game', new Game());
 game.state.add('menu', new Menu());
 game.state.add('battle', new Battle());
 game.state.add('preloader', new Preloader());
 game.state.add('gameover', new Gameover());

game.state.start('boot');
