import Phaser from 'phaser';

// Constants file
import { 
    DARK_BLUE_HEXCODE, 
    MIN_DURATION,
    MILLISECONDS_PER_MINUTE,
    SPACE_KEYBOARD_CODE } from '../constants.js';

// Asset Imports
import stickFigurePng from '../../public/assets/images/spritesheet.png';
import backgroundMusic from '../../public/assets/music/loop.wav';
import explosionWav from '../../public/assets/music/explosion.wav';
import hitWav from '../../public/assets/music/hit.wav';
import jumpWav from '../../public/assets/music/jump.wav';

export default class Game extends Phaser.Scene {
    player;
    rectangle;
    text;
    rotation = 0;
    rpm = 0;
    speed = 0.25;
    duration = 10000;
    jumpSound;
    hitSound;
    explosionSound;

    constructor() {
        super('game');
    }

    preload() {
        // add images
        this.load.spritesheet('stick-person', stickFigurePng, 
            {
                frameWidth: 10,
                frameHeight: 16,
                endFrame: 7
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

        
        this.rpm = MILLISECONDS_PER_MINUTE / this.duration;
        this.text.setText([
            `Rotation: ${this.rotation}`,
            `RPM: ${this.rpm.toFixed(2)}`
        ]);

        // background music loop
        let backgroundMusic = this.sound.add('background-music');
        backgroundMusic.loop = true;
        backgroundMusic.play()

        // game sound effects
        this.explosionSound = this.sound.add('explosion');
        this.hitSound = this.sound.add('hit');
        this.jumpSound = this.sound.add('jump');

        // main rectangle
        this.rectangle = this.add.rectangle(400, 300, 325, 325);
        this.rectangle.setStrokeStyle(5, DARK_BLUE_HEXCODE);

        // midpoint circle
        let circle = this.add.circle(400, 300, 20, DARK_BLUE_HEXCODE);

        // create stick person running animation
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('stick-person', {
                start: 3,
                end: 4,
                first: 3
            }),
            framerate: 2,
            repeat: -1
        });

        // create stick person jump animation
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('stick-person', {
                start: 0,
                end: 2,
                first: 0
            }),
            framerate: 2
        });

        // create stick person idle animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('stick-person', {
                start: 0,
                end: 0,
                first: 0
            }),
            framerate: 2
        });

        this.player = this.add.sprite(400, 100, 'stick-person');

        this.input.keyboard.on('keydown', event => {

            if(event.keyCode === SPACE_KEYBOARD_CODE) {
                this.player.play('jump');
                this.jumpSound.play();
            }
           
        });

        // Added physics
        this.matter.add.gameObject(this.rectangle, {isStatic: true});
        this.rectangle.setFriction(1, 0, Infinity);
        this.matter.add.gameObject(this.player);

        // Rotate rectangle
        const tween = this.tweens.addCounter({
            from: 0,
            to: -360,
            duration: this.duration,
            repeat: -1,
            onUpdate: (tween) => {
                this.rectangle.angle = tween.getValue();
            },
            onRepeat: (tween) => {
                this.rotation += 1;
                this.rpm = MILLISECONDS_PER_MINUTE / tween.data[0].duration;

                this.text.setText([
                    `Rotation: ${this.rotation}`,
                    `RPM: ${this.rpm.toFixed(2)}`
                ]);

                // decrease duration
                if(tween.data[0].duration > MIN_DURATION) {
                    tween.data[0].duration -= 500;
                }
            }
        });
    }

    update() {
        
    }
}