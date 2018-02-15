'use stirct'

const Leinwand = require('leinwand'),
  cu = require('canvas-utils')


const pressedMouseButtons = Object.create(null)

document.addEventListener('mousedown', evt => {
  pressedMouseButtons[evt.button] = true
})

document.addEventListener('mouseup', evt => {
  pressedMouseButtons[evt.button] = false
})


module.exports = class Staffelei extends Leinwand {
  constructor(canvas) {
    super(canvas)
    this._canvasEventEmitter = null
  }

  toImage() {
    cu.canvasToImage(this.getCanvas())
  }

  getCanvasEventEmitter() {
    if (!this._canvasEventEmitter) {
      this._canvasEventEmitter = cu.createCanvasEventEmitter(this.getCanvas())
    }

    return this._canvasEventEmitter
  }

  on(eventName, listener) {
    this.getCanvasEventEmitter().on(eventName, listener)
    return this
  }

  once(eventName, listener) {
    this.getCanvasEventEmitter().once(eventName, listener)
    return this
  }

  static isMouseDown(button = 0) {
    return pressedMouseButtons[button] === true
  }

  isMouseDown(button = 0) {
    return Staffelei.isMouseDown(button)
  }

}