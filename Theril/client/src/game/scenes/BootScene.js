import { Scene } from 'phaser'
import background from '../assets/background.jpeg'
import sky from '@/game/assets/sky.png'
import bomb from '@/game/assets/bomb.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'
import button from '../assets/button-1.png'
import alien from '../assets/bsquadron3.png'
import dude from '../assets/dude.png'


export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    
    this.load.image('sky', sky)
    this.load.image('background', background)
    this.load.image('bomb', bomb)
    this.load.image('button', button, { frameWidth: 20, frameHeight: 50 });
    this.load.spritesheet('alien', alien, { frameWidth: 192, frameHeight: 160 });
    // this.load.atlas('cards', '../assets/atlas/cards.png', '../assets/atlas/card.json');
    this.load.audio('thud', [thudMp3, thudOgg])

    ///////=====
    this.load.image('ground', '../assets/platform.png');
    this.load.image('star', '../assets/star.png');
    this.load.image('bomb', '../assets/bomb.png');
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    
  }

  create () {
    this.scene.start('PlayScene')
  }
}
