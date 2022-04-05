import Phaser from 'phaser';
import Game from './scenes/game.js';
import "../style.css"

const config = {
    width: 800,
    height: 600,
    backgroundColor: '#f0e9d2',
    parent: "game-container",
    type: Phaser.AUTO,
    scene: [ Game ],
    physics: {
        default: 'matter',
    }
};

export default new Phaser.Game(config);