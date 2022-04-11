import Phaser from 'phaser';
import StickPerson from '../stickPerson';

// Constants file
import { 
    DARK_BLUE_HEXCODE, 
    MIN_DURATION,
    MILLISECONDS_PER_MINUTE,
    SPACE_KEYBOARD_CODE } from '../constants.js';

// Asset Imports
import backgroundMusic from '../../public/assets/music/loop.wav';
import hitWav from '../../public/assets/music/hit.wav';


export default class Play extends Phaser.Scene {
    rectangle;
    text;
    rotation = 0;
    rpm = 0;
    speed = 0.25;
    duration = 10000;
    hitSound;

    constructor() {
        super('play');
        this.player = new StickPerson(this);
    }

    preload() {
        this.player.loadSceneAssets();
        // add audio 
        this.load.audio('background-music', backgroundMusic);
        this.load.audio('hit', hitWav);
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

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
        this.hitSound = this.sound.add('hit');
        

        // main rectangle
        this.rectangle = this.add.rectangle(400, 300, 365, 365);
        this.rectangle.setStrokeStyle(5, DARK_BLUE_HEXCODE);

        // midpoint circle
        let circle = this.add.circle(400, 300, 20, DARK_BLUE_HEXCODE);

        // Added physics
        this.matter.add.gameObject(this.rectangle, {isStatic: true, label: 'box'});
        //this.rectangle.setFriction(1, 0, Infinity);

        this.player.createSceneFeatures();
        
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
        if (this.cursors.right.isDown) {
            this.player.runRight();
        } else if (this.cursors.left.isDown) {
            this.player.runLeft();
        } else {
            this.player.stopRunning();
        }

        if (this.cursors.up.isDown || this.cursors.space.isDown) {
            this.player.jump();
        }

        if (this.player.isDead && !this.deadLastUpdate) {
            this.deadLastUpdate = true;
            this.player.scream();
            this.scene.start('game-over');
        }
    }
}