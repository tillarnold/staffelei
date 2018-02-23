const Staffelei = require('../')

const container = document.createElement('div')
document.body.appendChild(container)


const l = new Staffelei(container, {
  mode: 'layered',
  width: '500',
  height: '500'
})

window.l = l

l
  .createLayer('background', 0)
  .createLayer('front', 1)
  .layer('background')
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
  .fillRect(200, 200, 100, 100)
  .rotateContextAt(250, 250, Math.PI / 4)
  .fillRect(200, 200, 100, 100)
  .resetTransforms()
  .on('click', e => {
    l.layer('front').fillStyle('lime').fillRectCenteredAt(e.x, e.y, 15, 15)
  })


setInterval(() => {
  l.clearRect(400, 0, 100, 30)
    .fillTextCenteredAt(l.isMouseDown(), 450, 15)
}, 100)
