import Phaser from 'phaser';
import stickFigurePng from '../public/assets/images/spritesheet.png';
import jumpWav from '../public/assets/music/jump.wav';
import screamMp3 from '../public/assets/sfx/scream.mp3';

export default class StickPerson {
    scene;
    height;
    width;
    startX;
    startY;
    centerX;
    centerY;
    isBlockedLeft;
    isBlockedRight;
    isStanding;
    matterSprite;

    constructor(scene) {
        this.scene = scene;
        this.height = 16;
        this.width = 10;
        this.startX = 400;
        this.startY = 100;
        this.centerX = this.width / 2;
        this.centerY = this.width / 2;
    }

    get isDead() {
        // detect when the player fell off the screen
        return !this.scene.cameras.main.worldView.contains(this.matterSprite.x, this.matterSprite.y)
    }

    loadSceneAssets() {
        // add images
        this.scene.load.spritesheet('stick-person', stickFigurePng, 
        {
            frameWidth: this.width,
            frameHeight: this.height,
            endFrame: 7
        });

        this.scene.load.audio('jump', jumpWav);
        let scream = this.scene.load.audio('scream', screamMp3);
        scream.once('complete', this.onScreamCompleted);
    }

    createSceneFeatures() {
            let matter = this.scene.matter;
            let anims = this.scene.anims;
            let sound = this.scene.sound;
            // create stick person running right animation
            anims.create({
                key: 'run-right',
                frames: anims.generateFrameNumbers('stick-person', {
                    start: 4,
                    end: 3,
                    first: 4
                }),
                framerate: 2,
                repeat: -1
            });
    
            // create stick person running left animation
            anims.create({
                key: 'run-left',
                frames: anims.generateFrameNumbers('stick-person', {
                    start: 6,
                    end: 7,
                    first: 6
                }),
                framerate: 2,
                repeat: -1
            });

            // create stick person jump animation
            anims.create({
                key: 'jump',
                frames: anims.generateFrameNumbers('stick-person', {
                    start: 1,
                    end: 2,
                }),
                framerate: 10
            });
    
            // create stick person idle animation
            anims.create({
                key: 'idle',
                frames: anims.generateFrameNumbers('stick-person', {
                    start: 0,
                    end: 0,
                    first: 0
                }),
                framerate: 2
            }); 

            sound.add('jump');
            sound.add('scream');
        
            let torso = matter.bodies.rectangle(this.centerX, this.centerY, this.width * 0.75, this.height, { chamfer: { radius: 10 } });
            let legs = matter.bodies.rectangle(this.centerX, this.height, this.centerX, 5, { isSensor: true });
            let leftArm = matter.bodies.rectangle(this.centerX - this.width * 0.45, this.centerY, 5, this.height * 0.25, {isSensor: true});
            let rightArm = matter.bodies.rectangle(this.centerX + this.width * 0.45, this.centerY, 5, this.height * 0.25, {isSensor: true});
            let fullBody = matter.body.create({
                parts: [torso, leftArm, rightArm, legs],
                friction: 0.2,
                restitution: 0.05,
            });

            this.matterSprite = matter.add.sprite(this.startX, this.startY, 'stick-person');

            this.matterSprite.setExistingBody(fullBody)
                             .setFixedRotation()
                             .setPosition(this.startX, this.startY);
            console.dir(this.matterSprite);
            console.dir(this.startX);

            matter.world.on('beforeupdate', () => {
                this.isBlockedLeft = false;
                this.isBlockedRight = false;
                this.isStanding = false;

            });

            matter.world.on('collisionactive', (event) => {
                for (var i = 0; i < event.pairs.length; i++)
                {
                    var bodyA = event.pairs[i].bodyA;
                    var bodyB = event.pairs[i].bodyB;
    
                    if (bodyA === fullBody || bodyB === fullBody)
                    {
                        continue;
                    }
                    else if (bodyA === legs || bodyB === legs)
                    {
                        this.isStanding = true;
                    }
                    else if ((bodyA === leftArm && bodyB.isStatic) || (bodyB === leftArm && bodyA.isStatic))
                    {
                        this.isBlockedLeft = true;
                    }
                    else if ((bodyA === rightArm && bodyB.isStatic) || (bodyB === rightArm && bodyA.isStatic))
                    {
                        this.isBlockedRight = true;
                    }
                }
            });

    }

    runLeft() {
        if (!this.isBlockedLeft) {
            this.matterSprite.anims.play("run-left");
            this.matterSprite.setVelocityX(-1);
        } else {
            this.matterSprite.anims.play("idle");
        }
    }

    runRight() {
        if (!this.isBlockedRight) {
            this.matterSprite.anims.play("run-right");
            this.matterSprite.setVelocityX(1);
        } else {
            this.matterSprite.anims.play("idle");
        }
    }

    jump() {
        if (this.isStanding) {
            this.scene.sound.play("jump");
            this.matterSprite.anims.play("jump");
            this.matterSprite.setVelocityY(-5);
        } else {
            this.matterSprite.anims.play("idle");
        }
    }

    stopRunning() {
        this.matterSprite.anims.play("idle");
    }

    scream() {
        this.scene.sound.play("scream");

    }

    onScreamCompleted(event) {
        console.log('***');
        console.dir(event);
    }
}