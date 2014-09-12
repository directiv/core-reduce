/**
 * Compile an object reducer
 *
 * @param {Object} obj
 * @param {Boolean?} toString
 * @param {Function|String}
 */

module.exports = function(obj, toString) {
  return compile(obj, Object.keys(obj), toString);
};

// http://jsperf.com/object-iteration-with-pre-compiled-iterator
function compile(obj, props, toString) {
  var str = '(function(f,s) {\n';

  if (Array.isArray(obj)) {
    str += 'var arr=' + JSON.stringify(obj) + '\n';
    str += 'for(var i=0;i<' + obj.length + ';i++) {\ns=f(s,arr[i],i);\n}\n';
  } else {
    for (var i = 0; i < props.length; ++i) {
      str += 's=f(s,' + JSON.stringify(obj[props[i]]) + ',"' + props[i] + '");\n';
    }
  }

  str += 'return s;\n})';

  if (toString) return str;

  // WE KNOW WHAT WE'RE DOING HERE ;)
  return eval(str);
};
