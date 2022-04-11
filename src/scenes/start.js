import Phaser from 'phaser';

// Constants file
import { 
    HTML_DARK_BLUE_HEX_COLOR, 
    HTML_TEAL_HEX_COLOR } from '../constants.js';

export default class Start extends Phaser.Scene {
    constructor() {
        super('start');
    }

    create() {
        let dontFallText = this.add.text(175, 200, "DON'T FALL", { 
            fontFamily: "Fredoka One", 
            fontSize: 74, 
            color: HTML_DARK_BLUE_HEX_COLOR,
            align: 'center' 
        });
        dontFallText.setStroke(HTML_TEAL_HEX_COLOR, 16);

        this.add.text(225, 300, "press any key to start game", {
            font: '24px Fredoka One',
            fill: HTML_DARK_BLUE_HEX_COLOR,
            align: "center"
        });

        this.input.on('pointerup', function (pointer) {
            this.scene.start('play');
        }, this);
    }
}