import Phaser from 'phaser';
import Start from './scenes/start.js';
import Play from './scenes/play.js';
import GameOver from './scenes/gameOver.js';
import "../style.css"

const config = {
    width: 800,
    height: 600,
    backgroundColor: '#f0e9d2',
    parent: "game-container",
    type: Phaser.AUTO,
    scene: [ Start, Play, GameOver ],
    physics: {
        default: 'matter',
        debug: true,
        matter: {
           setBounds: {
               bottom: false
           } 
        }
    }
};

console.dir(config);

export default new Phaser.Game(config);