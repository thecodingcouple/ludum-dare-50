import Phaser from '../phaser.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.audio('background-music', '../../public/assets/music/loop.wav');
    }

    create() {
        let backgroundMusic = this.sound.add('background-music');
        backgroundMusic.loop = true;
        backgroundMusic.play()
    }
}