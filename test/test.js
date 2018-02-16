global.document = {}
global.document.addEventListener = () => {}

const test = require('tape'),
  Staffelei = require('..')


test('dummy', t => {
  t.plan(2)

  t.equal(300 + 300, 600)
  t.equal(10 + 90, 100)
})