import Phaser from '../phaser.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.audio('background-loop', '../../public/assets/music.loop.wav');
    }

    create() {
        this.sound.add('background-loop').play('loop');
    }
}