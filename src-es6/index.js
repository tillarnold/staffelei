import Leinwand from 'leinwand'

import {
  canvasToImage,
  createCanvasEventEmitter
} from 'canvas-utils'

import {
  LayerManager,
  ExpanderLayer
} from 'oni.js'

const pressedMouseButtons = Object.create(null)

document.addEventListener('mousedown', evt => {
  pressedMouseButtons[evt.button] = true
})

document.addEventListener('mouseup', evt => {
  pressedMouseButtons[evt.button] = false
})


export default class Staffelei extends Leinwand {

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


  // Move this to leinwand?
  setCanvas(canvas) {
    this._canvas = canvas
    this._ctx = canvas.getContext('2d')
    return this
  }

  /**
   * create an Image from the canvas
   */
  toImage() {
    return canvasToImage(this.getCanvas())
  }

  /**
   * get the underlying canvasEventEmitter
   *
   * this creates a canvasEventEmitter in case it has not been needed before
   */
  getCanvasEventEmitter() {
    if (!this._canvasEventEmitter) {
      this._canvasEventEmitter = createCanvasEventEmitter(this.getCanvas())
    }

    return this._canvasEventEmitter
  }

  /**
   * Alias for getCanvasEventEmitter().on
   */
  on(eventName, listener) {
    this.getCanvasEventEmitter().on(eventName, listener)
    return this
  }

  /**
   * Alias for getCanvasEventEmitter().once
   */
  once(eventName, listener) {
    this.getCanvasEventEmitter().once(eventName, listener)
    return this
  }

  /**
   * returns true if the mouse is currently donw
   *
   * this tracks this state globally
   */
  static isMouseDown(button = 0) {
    return pressedMouseButtons[button] === true
  }

  /**
   * Alias for the static Staffelei.isMouseDown
   */
  isMouseDown(button = 0) {
    return Staffelei.isMouseDown(button)
  }



  //LAYER METHODS

  _ensureIsInLayeredMode() {

    if (this._mode !== 'layered') {
      throw new Error('This Staffelei is not in layered mode')
    }
  }

  /**
   * Create a new layer
   *
   */
  createLayer(name, {
    layer = new ExpanderLayer(),
    position
  } = {}) {
    this._ensureIsInLayeredMode()
    this._lm.add(layer, position)
    this._layers.set(name, layer)
    return this
  }


  /**
   * Get the underlying oni.js LayerManager
   */
  getLayerManager() {
    this._ensureIsInLayeredMode()
    return this._lm
  }

  /**
   * Get the Layer from the LayerManager for the given name
   */
  getLayer(name) {
    this._ensureIsInLayeredMode()

    const layer = this._layers.get(name)
    if (!layer) {
      throw new Error('No layer with name "' + name + '" exists!')
    }

    return layer
  }

  /**
   * set the layer with the name as the current layer
   */
  layer(name) {
    this._ensureIsInLayeredMode()

    return this.setCanvas(this.getLayer(name).getElement())
  }

  /**
   * Fullscreens the LayerManager
   */
  doFullscreen() {
    this._ensureIsInLayeredMode()
    this._lm.doFullscreen()
    return this
  }

  /**
   * Exit fullscreen in case it had been enabeled
   */
  exitFullscreen() {
    this._ensureIsInLayeredMode()
    this._lm.exitFullscreen()
    return this
  }
}