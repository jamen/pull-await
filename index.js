module.exports = await;

/** @module pull-await
  *
  * Await promises in a pull-stream
  *
  */

function await(read) {
  return function(end, cb) {
    read(end, function(end, data) {
      if (end !== null) return cb(end);
      if (data && !data.then) return cb(null, data);
      data.then(function(value) {
        cb(null, value);
      }, cb);
    });
  };
};
