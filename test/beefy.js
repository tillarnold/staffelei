const Staffelei = require('../')

const canvas = document.createElement('canvas')
canvas.width = 500
canvas.height = 500
canvas.style.outline = '1px solid black'
document.body.appendChild(canvas)


const l = new Staffelei(canvas)

window.l = l

l
  .fillStyle('red')
  .mt(50, 50)
  .lt(250, 70)
  .lt(166, 99)
  .lt(166, 199)
  .closePath()
  .fill()
  .stroke()
  .beginPath()
  .fillStyle('blue')
  .circle(50, 50, 40)
  .fill()
  .stroke()
  .on('click', e => {
    l.fillStyle('lime').fillRect(e.x, e.y, 10, 10)
  })
  .fillRect(200, 200, 100, 100)
  .rotateContextAt(250, 250, Math.PI / 4)
  .fillRect(200, 200, 100, 100)
  .resetTransforms()