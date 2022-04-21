import Phaser from 'phaser';

// Constants file
import { 
    DEFAULT_DURATION_IN_MS,
    DARK_BLUE_HEXCODE,
    HTML_DARK_BLUE_HEX_COLOR, 
    HTML_TEAL_HEX_COLOR } from '../constants.js';

export default class Start extends Phaser.Scene {
    constructor() {
        super('start');
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        let rectangle = this.add.rectangle(400, 300, 550, 550);
        rectangle.setStrokeStyle(10, DARK_BLUE_HEXCODE);

        WebFont.load({
            google: {
                families: ['Fredoka One']
            },
            active: () => {
                let dontFallText = this.add.text(175, 200, "DON'T FALL", { 
                    fontFamily: "Fredoka One", 
                    fontSize: 74, 
                    color: HTML_DARK_BLUE_HEX_COLOR,
                    align: 'center' 
                });
                dontFallText.setStroke(HTML_TEAL_HEX_COLOR, 16);
        
                this.add.text(270, 325, "use arrow keys to move", {
                    font: '24px Fredoka One',
                    fill: HTML_DARK_BLUE_HEX_COLOR,
                    align: "center"
                });
        
                this.add.text(245, 355, "press any key to start game", {
                    font: '24px Fredoka One',
                    fill: HTML_DARK_BLUE_HEX_COLOR,
                    align: "center"
                });
            }
        });

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

        this.input.on('pointerup', function (pointer) {
            this.scene.switch('play');
        }, this);

        this.input.keyboard.on('keyup', () => {
            this.scene.switch('play');
        }, this);
    }
}