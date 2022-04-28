import Phaser from 'phaser';
import StickPerson from '../stickPerson';

// Constants file
import { 
    DEFAULT_DURATION_IN_MS,
    DARK_BLUE_HEXCODE, 
    HTML_DARK_BLUE_HEX_COLOR,
    MIN_DURATION,
    MILLISECONDS_PER_MINUTE } from '../constants.js';

// Asset Imports
import backgroundMusic from '../../public/assets/music/loop.wav';
import hitWav from '../../public/assets/music/hit.wav';


export default class Play extends Phaser.Scene {
    rectangle;
    rectangleTween;
    text;
    rotation = 0;
    rpm = 0;
    speed = 0.25;
    duration = DEFAULT_DURATION_IN_MS;
    hitSound;
    isMusicMuted = false;

    /**
     * Contructor
     */
    constructor() {
        super('play');
        this.player = new StickPerson(this);
    }

    /**
     * Preload
     */
    preload() {
        this.player.loadSceneAssets();
        // add audio 
        this.load.audio('background-music', backgroundMusic);
        this.load.audio('hit', hitWav);

        this.events.on('wake', () => {
            this.resetGame();
        });
    }

    /**
     * Create
     */
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        // game text
        this.text = this.add.text(20, 10, '', {
            font: '24px Fredoka One',
            fill: HTML_DARK_BLUE_HEX_COLOR
        });

        
        this.rpm = MILLISECONDS_PER_MINUTE / this.duration;
        this.text.setText([
            `Rotation: ${this.rotation}`,
            `RPM: ${this.rpm.toFixed(2)}`
        ]);

        this.add.text(625, 575, "toggle volume with m", {
            font: '16px Fredoka One',
            fill: HTML_DARK_BLUE_HEX_COLOR,
            align: "right"
        });

        // background music loop
        let backgroundMusic = this.sound.add('background-music');
        backgroundMusic.loop = true;
        backgroundMusic.play()

        // toggle muting music on m keypress
        this.input.keyboard.on('keydown-M', () => {
            if (!this.isMusicMuted) {
                this.sound.volume = 0;
                this.isMusicMuted = true;
            } else {
                this.sound.volume = 1;
                this.isMusicMuted = false;
            }
        }, this);

        // game sound effects
        this.hitSound = this.sound.add('hit');

        // midpoint circle
        this.add.circle(400, 300, 20, DARK_BLUE_HEXCODE);

        this.rectangle = this.add.rectangle(0, 0, 400, 400);
        this.rectangle.setStrokeStyle(5, DARK_BLUE_HEXCODE);

        const obstacleConfig = [
            {
                width: 25,
                height: 25,
                x: 100,
                y: 250
            },
            {
                width: 15,
                height: 25,
                x: 75,
                y: 215
            },
            {
                width: 15,
                height: 25,
                x: 175,
                y: 215
            },
            {
                width: 15,
                height: 35,
                x: -275,
                y: 25
            }
        ];

        let obstacles = this.createObstacles(obstacleConfig);
        let obstacleBodies = this.createObstacleBodies(obstacleConfig);

        // Add game objects to container
        this.container = this.add.container(0, 0, [this.rectangle, ...obstacles]);
        this.container = this.matter.add.gameObject(this.container);
     
        // Added physics
        let mainPlatformBody = this.matter.bodies.rectangle(200, 200, 400, 400);
        let fullPlatformBody = this.matter.body.create({
           parts: [mainPlatformBody, ...obstacleBodies],
           isStatic: true
        });
        this.container.setExistingBody(fullPlatformBody).setPosition(400, 300);

        // Added physics
        //this.matter.add.gameObject(this.rectangle, {isStatic: true, label: 'box'});
        //this.rectangle.setFriction(1, 0, 0.05);

        this.player.createSceneFeatures();
        
        // Rotate rectangle
        this.rectangleTween = this.tweens.addCounter({
            from: 0,
            to: -360,
            duration: this.duration,
            repeat: -1,
            onUpdate: (tween) => {
                this.container.angle = tween.getValue();
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

    /**
     * Game loop
     */
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

            this.scene.switch('game-over');
        }
    }

    /**
     * Reset the game state
     */
    resetGame() {
        this.rectangleTween.pause();

        this.player.reset();
        this.duration = DEFAULT_DURATION_IN_MS;
        this.rotation = 0;
        this.deadLastUpdate = false;

        this.rectangleTween.update('duration', this.duration);

        this.rpm = MILLISECONDS_PER_MINUTE / this.duration;
        this.text.setText([
            `Rotation: ${this.rotation}`,
            `RPM: ${this.rpm.toFixed(2)}`
        ]);

        this.rectangleTween.resume();
        this.rectangleTween.restart();
    }

    /**
     * Create rectangles for obstacles
     * @returns array of rectangle
     */
    createObstacles(config) {
        const obstacles = config.map(o => this.add.rectangle(
            o.x, o.y, o.width, o.height, DARK_BLUE_HEXCODE));

        return obstacles;
    }

    /**
     * Create physic bodies for obstacles
     * @returns array of Physic bodies
     */
    createObstacleBodies(config) {
        const obstacleBodies = config.map(o => this.matter.bodies.rectangle(
            o.x + 200, o.y + 200, o.width, o.height));

        return obstacleBodies;
    }
}