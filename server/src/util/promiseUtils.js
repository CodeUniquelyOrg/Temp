/**
 * Throw an array to it and a function which can generate promises
 * and it will call them sequentially, one after another
 */
export function sequence(items, consumer) {
  const results = [];
  const runner = () => {
    const item = items.shift();
    if (item) {
      return consumer(item)
        .then((result) => {
          results.push(result);
        })
        .then(runner);
    }

    return Promise.resolve(results);
  };

  return runner();
}

// var Promise = require('mongoose').Promise;

export function addAll(promises) {
  if (promises.length === 0) {
    return Promise.resolve(null, promises);
    // mainPromise.resolve(null, promises);
  }

  const mainPromise = new Promise();
  let pending = 0;

  promises.forEach((p, i) => {
    pending++;

    p.then(val => {
      promises[i] = val; // eslint-disable-line
      if (--pending === 0) {
        mainPromise.resolve(null, promises);
      }
    }, err => {
      mainPromise.reject(err);
    });
  });

  return mainPromise;
}
