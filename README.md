# Staffelei
[![NPM version](https://badge.fury.io/js/staffelei.svg)](http://badge.fury.io/js/staffelei)
[![Build Status](https://travis-ci.org/tillarnold/staffelei.svg?branch=master)](https://travis-ci.org/tillarnold/staffelei)
[![devDependency Status](https://david-dm.org/tillarnold/staffelei/dev-status.svg)](https://david-dm.org/tillarnold/staffelei#info=devDependencies)
[![Dependency Status](https://david-dm.org/tillarnold/staffelei.svg)](https://david-dm.org/tillarnold/staffelei)
[![Coverage Status](https://coveralls.io/repos/tillarnold/staffelei/badge.svg?branch=master)](https://coveralls.io/r/tillarnold/staffelei?branch=master)

`Staffelei` is a utility class that makes working with the 2D Canvas API (`CanvasRenderingContext2D`) easier.
The `Staffelei` class extends the [`Leinwand`](https://github.com/tillarnold/leinwand). Thus you get all the method chaining goodness
form there. Additionally `Staffelei` provides more utilify methods, event handeling, as well as multi layer canvases.

There are two ways to use Staffelei. Either you use it in the same way as `Leinwand`.
Simply as a wrapper around a canvas.
Or you also use it to manage layers.

In the first case (called `simple`-mode) you'd do something like this:

```js
import Staffelei from 'staffelei';
//or
const Staffelei = require('staffelei');

let s = new Staffelei(document.getElementById('myCanvas'));

s
  .fillStyle('red')
  .mt(20,20)
  //...
```

Where the element with the id `myCanvas` is a canvas.

If you want to use the layers you use `layered`-mode.

```js
let s = new Staffelei(document.getElementById('myContainer'), { mode: 'layered' ,
                                                                width: 500
                                                                height: 500  });

s
  .createLayer('background')
  .fillRectCenteredAt(200,200, 20, 30)
  .createLayer('foreground')
  //...
```

In this case the element with the id `myContainer` is the element (e.g. a div) in which the canvas will be placed by Staffelei. 


## Methods
All the methods from [`Leinwand`](https://github.com/tillarnold/leinwand) are available.

#### s.on(eventName, listener)
This registers an eventlistener. The available events are:

| Events with synonyms        |  
|-----------------------------|
| `mouseup`                   |
| `mousedown`                 |
| `mousemove`                 |
| `mouseover`, `mousein`      |
| `mouseleave`, `mouseout`    |
| `click`                     |
| `leftclick`                 |
| `contextmenu`, `rightclick` |
 

so for example if you want to draw a square where a user clicks on the canvas:

```js
s.on('click', e => {
  s.fillRectCenteredAt(e.x,e.y,10,10);
});
```

The event object you get for all of the events looks like this:

| Property       | Description |
|----------------|-------------------------------------------------------|
| x              | the x coordinate of the event relative to the canvas |
| y              | the y coordinate of the event relative to the canvas |
| target         | the canvas the event belongs to (The `target` you passed into the constructor) |
| event          | the original DOM event emitted on the `eventSource` |
| button         | the button property from the `event` |
| preventDefault | a function that calles `preventDefault` on the `event` |

#### s.once(eventName, listener)
like s.on except the `listener` is only called once.

##### s.isMouseDown(button)
Returns true if the mouse button with button number `button` is currently down. `button` defaults to 1 which is the left mouse button.
Since this method does not need any state from the Staffelei object it can also be called staticaly like `Staffelei.isMouseDown(button)`.

### Methods for `layered`-mode
These methods only work when Staffelei is used in `layered`-mode and will throw an `Error` if used in `simple`-mode.

#### s.createLayer(name, {position})
Creates a new layer with the name `name` and the `position` in the stack of layers.
Also sets the newly created layer as the current layer.

#### layer(name) 
Switch the current layer to the layer with the name `name`. If no layer with that name exists this throws an `Error`.

#### doFullscreen()
Enter fullscreen.

#### exitFullscreen()
Exist fullscreen.

## Getting Staffelei
The easiest way to use Staffelei is to use the npm package and the use it with some tool like [browserify](http://browserify.org/) or [rollup](https://rollupjs.org).

If you'd rather just get a `.js` file you can download it from the releases page. There are two versions available there. One built with rollup and one built with browserify. 
The rollup version is smaller but the browserify version is probably more compatible with older browsers since more of the code has been transpiled.

## Release History
* 2018-05-06   v0.1.1   documentation
* 2018-02-23   v0.1.0   add layer management
* 2018-02-09   v0.0.1   initial version
