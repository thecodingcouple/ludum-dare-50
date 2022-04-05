import Phaser from 'phaser';

// Constants file
import { DARK_BLUE_HEXCODE, MAX_ROTATION_SPEED } from '../constants.js';

// Asset Imports
import stickFigurePng from '../../public/assets/images/spritesheet.png';
import backgroundMusic from '../../public/assets/music/loop.wav';
import explosionWav from '../../public/assets/music/explosion.wav';
import hitWav from '../../public/assets/music/hit.wav';
import jumpWav from '../../public/assets/music/jump.wav';

export default class Game extends Phaser.Scene {
    // @type { Phaser.Physics.Arcade.Sprite }
    //player;
    rectangle;
    text;
    rotation = 0;
    rpm = 0;
    speed = 0.25;

    constructor() {
        super('game');
    }

    preload() {
        // add images
        this.load.spritesheet('stick-person', stickFigurePng, 
            {
                frameWidth: 10,
                frameHeight: 16,
                endFrame: 4
            });

        // add audio 
        this.load.audio('background-music', backgroundMusic);
        this.load.audio('explosion', explosionWav);
        this.load.audio('hit', hitWav);
        this.load.audio('jump', jumpWav);
    }

    create() {
        // game text
        this.text = this.add.text(20, 10, '', {
            font: '24px Fredoka One',
            fill: "#181d31"
        });
        this.text.setText([
            `Rotation: ${this.rotation}`,
            `RPM: ${this.rpm}`
        ]);

        // background music loop
        let backgroundMusic = this.sound.add('background-music');
        backgroundMusic.loop = true;
        backgroundMusic.play()

        // game sound effects
        let explosionSound = this.sound.add('explosion');
        let hitSound = this.sound.add('hit');
        let jumpSound = this.sound.add('jump');

        // main rectangle
        this.rectangle = this.add.rectangle(400, 300, 325, 325);
        this.rectangle.setStrokeStyle(5, DARK_BLUE_HEXCODE);

        // midpoint circle
        let circle = this.add.circle(400, 300, 20, DARK_BLUE_HEXCODE);

        // player character 
        var config = {
            key: 'runningAnimation',
            frames: this.anims.generateFrameNumbers('stick-person', {
                start: 2,
                end: 4,
                first: 2
            }),
            framerate: 4,
            repeat: -1
        };

        // create stick person running animation
        this.anims.create(config);

        let player = this.add.sprite(400, 100, 'stick-person').play('runningAnimation');

        // Added physics
        this.matter.add.gameObject(this.rectangle, {isStatic: true});
        this.rectangle.setFriction(1, 0, Infinity);
        this.matter.add.gameObject(player);

        var tween = this.tweens.addCounter({
            from: 0,
            to: -360,
            duration: 5000,
            repeat: -1,
            onUpdate: (tween) =>
            {
                this.rectangle.angle = tween.getValue();
            }
        });
    }

    update() {
  
        this.text.setText([
            `Rotation: ${this.rotation}`,
            `RPM: ${this.rpm}`
        ]);
    }
}