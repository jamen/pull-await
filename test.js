var await = require('./');
var pull = require('pull-stream');
var test = require('tape');

function delayedEcho(text) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(text);
    }, 1000);
  });
}

test('test', function(t) {
  pull(
    pull.values([ 'hello', delayedEcho('cool'), Promise.resolve('world') ]),
    await, // use pull-await on promises or anything thenable.
    pull.collect(function(err, res) {
      t.same(res, ['hello', 'cool', 'world'], 'resolved promise');
      t.end();
    })
  );
});
