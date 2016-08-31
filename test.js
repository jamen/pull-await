var await = require('./');
var pull = require('pull-stream');
var test = require('tape');
var Bluebird = require('bluebird');
var request = require('request-promise');
var assert = require('assert');

const delay = text => new Promise(resolve => {
  setTimeout(function() {
    resolve(text);
  }, 1000);
});

test('promises', function(t) {
  pull(
    pull.values([ 'hello', delay('cool'), Promise.resolve('world') ]),
    await, // use pull-await on promises or anything thenable.
    pull.collect(function(err, data) {
      t.same(data, ['hello', 'cool', 'world'], 'resolved promise');
      t.end();
    })
  );
});

test('using bluebird', function(t) {
  pull(
    pull.values([new Bluebird(function(r) {
      setTimeout(function() { r('hello world!'); }, 500);
    })]),
    await,
    pull.collect(function(err, data) {
      if (err) throw err;
      t.same(data, ['hello world!'], 'bluebird promise');
      t.end();
    })
  );
});

test('using request-promise', function(t) {
  pull(
    pull.values([ request('https://registry.npmjs.org/pull-await/0.1.0') ]),
    await,
    pull.collect(function(err, res) {
      if (err) throw err;
      console.log(res);
      t.end();
    })
  );
});
