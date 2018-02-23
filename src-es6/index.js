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
    const container = canvas
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

  //LAYER METHODS


  _ensureIsInLayeredMode() {

    if (this._mode !== 'layered') {
      throw new Error('This Staffelei is not in layered mode')
    }
  }

  createLayer(name, {
    layer = new ExpanderLayer(),
    position
  } = {}) {
    this._ensureIsInLayeredMode()
    this._lm.add(layer, position)
    this._layers.set(name, layer)
    return this
  }


  getLayerManager() {
    this._ensureIsInLayeredMode()
    return this._lm
  }

  getLayer(name) {
    this._ensureIsInLayeredMode()

    const layer = this._layers.get(name)
    if (!layer) {
      throw new Error('No layer with name "' + name + '" exists!')
    }

    return layer
  }

  layer(name) {
    this._ensureIsInLayeredMode()

    return this.setCanvas(this.getLayer(name).getElement())
  }

  doFullscreen() {
    this._ensureIsInLayeredMode()
    this._lm.doFullscreen()
    return this
  }

  exitFullscreen() {
    this._ensureIsInLayeredMode()
    this._lm.exitFullscreen()
    return this
  }
}