import Phaser from 'phaser';

// Constants file
import { 
    DEFAULT_DURATION_IN_MS,
    DARK_BLUE_HEXCODE,
    HTML_DARK_BLUE_HEX_COLOR, 
    HTML_TEAL_HEX_COLOR } from '../constants.js';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over');
    }

    create() {
        let rectangle = this.add.rectangle(400, 300, 550, 550);
        rectangle.setStrokeStyle(10, DARK_BLUE_HEXCODE);

        // Rotate rectangle
        this.tweens.addCounter({
            from: 0,
            to: -360,
            duration: DEFAULT_DURATION_IN_MS,
            repeat: -1,
            onUpdate: (tween) => {
                rectangle.angle = tween.getValue();
            },
        });

        let gameOverText = this.add.text(175, 200, "GAME OVER", { 
            fontFamily: "Fredoka One", 
            fontSize: 74, 
            color: HTML_DARK_BLUE_HEX_COLOR,
            align: 'center' 
        });
        gameOverText.setStroke(HTML_TEAL_HEX_COLOR, 16);

        this.add.text(255, 305, "press any key to continue", {
            font: '24px Fredoka One',
            fill: HTML_DARK_BLUE_HEX_COLOR,
            align: "center"
        });

        this.input.on('pointerup', function (pointer) {
            this.scene.switch('play');
        }, this);
    }
}