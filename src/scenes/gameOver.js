import Phaser from 'phaser';

// Constants file
import { 
    HTML_DARK_BLUE_HEX_COLOR, 
    HTML_TEAL_HEX_COLOR } from '../constants.js';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over');
    }

    create() {
        let gameOverText = this.add.text(175, 200, "GAME OVER", { 
            fontFamily: "Fredoka One", 
            fontSize: 74, 
            color: HTML_DARK_BLUE_HEX_COLOR,
            align: 'center' 
        });
        gameOverText.setStroke(HTML_TEAL_HEX_COLOR, 16);

        this.add.text(225, 300, "Press Any Key to Continue", {
            font: '24px Fredoka One',
            fill: HTML_DARK_BLUE_HEX_COLOR,
            align: "center"
        });

        this.input.on('pointerup', function (pointer) {
            this.scene.start('play');
        }, this);
    }
}