import Leinwand from 'leinwand'
import {
  canvasToImage,
  createCanvasEventEmitter
} from 'canvas-utils'

import {
  LayerManager,
  ExpanderLayer
} from '@tillarnold/oni'

const pressedMouseButtons = Object.create(null)

document.addEventListener('mousedown', evt => {
  pressedMouseButtons[evt.button] = true
})

document.addEventListener('mouseup', evt => {
  pressedMouseButtons[evt.button] = false
})


module.exports = class Staffelei extends Leinwand {
  constructor(canvas, {
    mode = 'simple',
    width,
    height
  } = {}) {
    let container = canvas
    if (mode !== 'layered' && mode !== 'simple') {
      throw new Error('mode has to be simple or layered')
    }

    if (mode === 'layered') {
      canvas = {
        getContext: () => null
      }
    }

    super(canvas)


    this._container = container

    if (mode === 'layered') {
      this._canvas = null
      this._lm = new LayerManager(width, height)
      this._lm.attachTo(this._container)
      this._layers = new Map()
    }

    this._canvasEventEmitter = null
    this._mode = mode
  }

  createLayer(name, {
    layer = new ExpanderLayer(),
    position
  } = {}) {
    if (this._mode !== 'layered') {
      throw new Error('This Staffelei is not in layered mode')
    }

    this._lm.add(layer, position)
    this._layers.set(name, layer)
    return this
  }

  layer(name) {
    if (this._mode !== 'layered') {
      throw new Error('This Staffelei is not in layered mode')
    }

    const layer = this._layers.get(name)

    this.setCanvas(layer.getElement())
    return this
  }
  /*
   * Move to to leinwand?
   */
  setCanvas(canvas) {
    this._canvas = canvas
    this._ctx = canvas.getContext('2d')
    return this
  }

  toImage() {
    return canvasToImage(this.getCanvas())
  }

  getCanvasEventEmitter() {
    if (!this._canvasEventEmitter) {
      this._canvasEventEmitter = createCanvasEventEmitter(this.getCanvas())
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