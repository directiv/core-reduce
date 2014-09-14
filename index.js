/**
 * Compile an object reducer
 *
 * @param {Object} obj
 * @param {Array?} keys
 * @param {Function}
 */

module.exports = function(obj, keys) {
  return Array.isArray(obj) ?
    initArray(obj) :
    initObj(obj, keys || Object.keys(obj));
};

function initArray(obj) {
  var arr = obj;
  return function(fn, acc) {
    for (var i = 0, l = arr.length; i < l; i++) {
      acc = fn(acc, arr[i], i);
    }
    return acc;
  };
}

function initObj(obj, keys) {
  var o = obj, p = keys;
  return function(fn, acc) {
    for (var i = 0, l = p.length, key; i < l; i++) {
      key = p[i];
      acc = fn(acc, o[key], key);
    }
    return acc;
  };
}
