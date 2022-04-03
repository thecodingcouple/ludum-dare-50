import Phaser from 'phaser';
import pusheenImg from '../../public/assets/images/pusheen.png';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.audio('background-loop', '../../public/assets/music.loop.wav');
        this.load.image('pusheen', pusheenImg);
    }

    create() {
        this.sound.add('background-loop').play('loop');

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