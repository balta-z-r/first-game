import { Player, Map, Enemy } from './modules/app'

import Config from 'config'
import p5 from 'p5'

const ENEMY_GRID_VAL = Config.game.room.gridVals.enemy

class Game {
  constructor(container) {
    this.sketch = p => {
      this.player = new Player(p)
      this.map = new Map(p, this.player)
      this.enemy = new Enemy()

      p.preload = () => {
        this.map.sprite.loadSprite()
        this.player.sprite.loadSprite()
      }

      p.setup = () => {
        const myCanvas = p.createCanvas(600, 400)
        myCanvas.parent(container)

        p.textFont('Helvetica')
        p.textAlign(p.CENTER, p.CENTER)
      }

      p.draw = () => {
        p.background('#160f30')
        this.update()
      }
    }

    // eslint-disable-next-line new-cap
    this.p5instance = new p5(this.sketch)
  }

  update = () => {
    this.map.update()
    this.player.update()
  }

  enemyMove = () => {
    this.enemy.move(this.player)

    this.map.rooms[`${this.enemy.room[0]},${this.enemy.room[1]}`].updateGrid(
      this.enemy.roomCoords[0],
      this.enemy.roomCoords[1],
      ENEMY_GRID_VAL
    )
  }

  roomChange = dir => {
    this.map.move(dir)
  }
}

export default Game
