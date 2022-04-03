import Phaser from 'phaser';

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
        this.data.set('rotations', 0);
        this.data.set('rpm', 15);

        let text = this.add.text(20, 10, '', {
            font: '24px Fredoka One',
            fill: "#181d31"
        });
        text.setText([
            `Rotation: ${this.data.get('rotations')}`,
            `RPM: ${this.data.get('rpm')}`
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
        this.rectangle = this.add.rectangle(400, 300, 275, 275);
        this.rectangle.setStrokeStyle(5, 0x181d31);

        // midpoint circle
        let circle = this.add.circle(400, 300, 20, 0x181d31);

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

        let player = this.add.sprite(400, 150, 'stick-person').play('runningAnimation');

        // Add physics to stick person
        //this.player = this.physics.add.sprite(0, 0, 'stick-person');

        // Add collider
    }

    update() {
        this.rectangle.rotation -= 0.002;
    }
}