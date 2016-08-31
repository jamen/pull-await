# pull-await [![NPM version](https://badge.fury.io/js/pull-await.svg)](https://npmjs.org/package/pull-await) [![Build Status](https://travis-ci.org/jamen/pull-await.svg?branch=master)](https://travis-ci.org/jamen/pull-await)

> Await promises in a pull-stream.

```javascript
pull(
  pull.values([ 'hello', Promise.resolve('world') ]),
  await, // use pull-await on promises or anything thenable.
  pull.collect(function(err, res) {
    t.same(res, ['hello', 'world']);
  })
);
```

## Installation

```sh
$ npm install --save pull-await
```

## Usage

Pull promises, thenable objects, or regular through and await those necessary.

```js
await(function(err, cb) {
  // Push promises to read for `await`
  cb(null, new Promise(r => setTimeout(() => r('hello'), 1000)));
  cb(null, Promise.resolve('cool'));
  cb(null, 'yay!');
  cb(true);
})(null, function(err, data) {
  if (err === true) return;
  if (err) throw err;

  // Log awaited data.
  console.log(data);
});
```

## License

MIT © [Jamen Marz](https://github.com/jamen)
