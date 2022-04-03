import Phaser from 'phaser';
import pusheenImg from '../../public/assets/images/pusheen.png';
import backgroundMusic from '../../public/assets/music/loop.wav';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.image('pusheen', pusheenImg);
        //this.load.audio('background-music', '../../public/assets/music/loop.wav');
        this.load.audio('background-music', backgroundMusic);
    }

    create() {
        let backgroundMusic = this.sound.add('background-music');
        backgroundMusic.loop = true;
        backgroundMusic.play()

        const pusheen = this.add.image(400, 150, 'pusheen');
      
        this.tweens.add({
            targets: pusheen,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}