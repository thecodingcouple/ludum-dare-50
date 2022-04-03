import Phaser from './src/phaser.js';
import Game from './src/scenes/game.js';

const config = {
    width: 800,
    height: 600,
    backgroundColor: '#f0e9d2',
    parent: "game-container",
    type: Phaser.AUTO,
    scene: Game
}

export default new Phaser.Game(config);