# Staffelei
[![NPM version](https://badge.fury.io/js/staffelei.svg)](http://badge.fury.io/js/staffelei)
[![Build Status](https://travis-ci.org/tillarnold/staffelei.svg?branch=master)](https://travis-ci.org/tillarnold/staffelei)
[![devDependency Status](https://david-dm.org/tillarnold/staffelei/dev-status.svg)](https://david-dm.org/tillarnold/staffelei#info=devDependencies)
[![Dependency Status](https://david-dm.org/tillarnold/staffelei.svg)](https://david-dm.org/tillarnold/staffelei)
[![Coverage Status](https://coveralls.io/repos/tillarnold/staffelei/badge.svg?branch=master)](https://coveralls.io/r/tillarnold/staffelei?branch=master)

`Staffelei` is a utility class that makes working with the 2D Canvas API (`CanvasRenderingContext2D`) easier.
The `Staffelei` class extends the [`Leinwand`](https://github.com/tillarnold/leinwand)-class. Thus you get all the method chaining goodness
form there. Additionally `Staffelei` provides methods from [canvas-utils](https://github.com/tillarnold/canvas-utils).
Also `Staffelei` provides a `LayerManager` from [oni.js](https://github.com/tillarnold/oni).

There are two ways to use Staffelei. Either you use it in the same way as `Leinwand` is used simply as a wrapper around a canvas or you
also use it to manage layers.

In the first case which is called simple mode you'd do something like this:

```js
import Staffelei from 'staffelei';
//or
const Staffelei = requiew('staffelei');

let s = new Staffelei(document.getElementById('myCanvas'));

s
  .fillStyle('red')
  .mt(20,20)
  //...
```

Where the element with the id `myCanvas` is a canvas.

If you want to use the layers you use 'layered' mode.

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

## Release History
* 2018-02-09   v0.0.1   initial version
