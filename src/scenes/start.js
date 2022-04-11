import Phaser from 'phaser';

// Constants file
import { 
    DEFAULT_DURATION_IN_MS,
    DARK_BLUE_HEXCODE,
    HTML_BEIGE_HEX_COLOR,
    HTML_DARK_BLUE_HEX_COLOR, 
    HTML_TEAL_HEX_COLOR } from '../constants.js';

export default class Start extends Phaser.Scene {
    constructor() {
        super('start');
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

        let dontFallText = this.add.text(175, 200, "DON'T FALL", { 
            fontFamily: "Fredoka One", 
            fontSize: 74, 
            color: HTML_DARK_BLUE_HEX_COLOR,
            align: 'center' 
        });
        dontFallText.setStroke(HTML_TEAL_HEX_COLOR, 16);

        this.add.text(245, 300, "press any key to start game", {
            font: '24px Fredoka One',
            fill: HTML_DARK_BLUE_HEX_COLOR,
            align: "center"
        });

        // add button instructions
        const keyTextStyle = {
            font: '36px Fredoka One',
            color: HTML_BEIGE_HEX_COLOR,
            align: "center",
            fontStyle: 'bold',
        };

        // left arrow
        const centerx = 400;
        const y = 400;
        let arrowLeftText = this.add.text(centerx - 54, y, "←", keyTextStyle);
        arrowLeftText.setStroke(HTML_DARK_BLUE_HEX_COLOR, 28);
        
        // up arrow
        let arrowUpText = this.add.text(centerx - 12, y - 14, "↑", keyTextStyle);
        arrowUpText.setStroke(HTML_DARK_BLUE_HEX_COLOR, 28);

        // right arrow
        let arrowRightText = this.add.text(centerx + 12, y, "→", keyTextStyle);
        arrowRightText.setStroke(HTML_DARK_BLUE_HEX_COLOR, 28);


        this.input.on('pointerup', function (pointer) {
            this.scene.switch('play');
        }, this);
    }
}