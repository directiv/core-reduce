/**
 * Compile an object reducer
 *
 * @param {Object} obj
 * @param {Array?} keys
 * @param {Boolean?} ignoreKey
 * @param {Function}
 */

module.exports = function(obj, keys, ignoreKey) {
  return Array.isArray(obj) ?
    initArray(obj) :
    initObj(obj, keys || Object.keys(obj), ignoreKey);
};

function initArray(arr) {
  return (function(fn, acc) {
    for (var i = 0, l = this.length; i < l; i++) {
      acc = fn(acc, this[i], i);
    }
    return acc;
  }).bind(arr);
}

function initObj(obj, keys, ignoreKey) {
  var arr = keys.map(function(key) {
    return obj[key];
  });

  if (ignoreKey) return initArray(arr);

  return (function(ks, fn, acc) {
    for (var i = 0, l = this.length; i < l; i++) {
      acc = fn(acc, this[i], keys[i]);
    }
    return acc;
  }).bind(arr, keys);
}
