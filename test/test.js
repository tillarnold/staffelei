const test = require('tape')



test('dummy', t => {
  t.plan(2)

  t.equal(300 + 300, 600)
  t.equal(10 + 90, 100)
})