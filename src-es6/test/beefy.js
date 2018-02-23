import Staffelei from '..'

const container = document.createElement('div')
document.body.appendChild(container)

const button = document.createElement('button')
button.innerText = 'fullscreen'
document.body.appendChild(button)

const l = new Staffelei(container, {
  mode: 'layered',
  width: '500',
  height: '500'
})

button.addEventListener('click', () => l.doFullscreen())
window.l = l

l
  .createLayer('solid', 1)
  .getCanvas()
  .style.background = 'purple'
l
  .createLayer('background', 2)
  .createLayer('front', 3)
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
  .on('mousemove', e => {
    l.layer('front').clear().fillStyle('lime').fillRectCenteredAt(e.x, e.y, 15, 15)
  })


setInterval(() => {
  l
    .layer('background')
    .clearRect(400, 0, 100, 30)
    .fillTextCenteredAt(l.isMouseDown(), 450, 15)
}, 100)
