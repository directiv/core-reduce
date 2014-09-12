var compile = require('../');
var should = require('should');
var benchmark = require('directiv-test-benchmark');

describe('core-reduce', function() {
  it('should compile an object', function() {
    var input = {
      name: 'Brannon',
      food: 'burrito',
      address: {
        city: 'Nowhere',
        street: '123 Fake Street',
        zip: 12345
      }
    };

    var res = compile(input)(function(acc, val, key) {
      acc[key] = val;
      return acc;
    }, {}).should.eql(input);
  });

  it('should compile an array', function() {
    var input = [
      'foo',
      'bar',
      {baz: true}
    ];

    var res = compile(input)(function(acc, val, key) {
      acc[key] = val;
      return acc;
    }, []).should.eql(input);
  });

  describe('benchmarks', function() {
    describe('object', function() {
      var iterations = 10000;
      var length = 1000;
      var obj = {};
      for (var i = 0; i < length; i++) {
        obj[i] = i;
      }

      describe('compiled', function() {
        var reduce = compile(obj);

        benchmark(iterations, length, function() {
          reduce(function(acc, value, key) {
            acc[key] = value;
            return acc;
          }, {});
        });
      });

      describe('for', function() {
        benchmark(iterations, length, function() {
          function pass(acc1, value, key) {
            acc1[key] = value;
            return acc1;
          }
          var acc = {};
          for (var k in obj) {
            acc = pass(acc, obj[k], k);
          }
        });
      });
    });

    describe('array', function() {
      var iterations = 10000;
      var length = 1000;
      var arr = [];
      for (var i = 0; i < length; i++) {
        arr.push(i);
      }

      describe('compiled', function() {
        var reduce = compile(arr);

        benchmark(iterations, length, function() {
          reduce(function(acc, value, key) {
            acc[key] = value;
            return acc;
          }, {});
        });
      });

      describe('for', function() {
        benchmark(iterations, length, function() {
          function pass(acc1, value, key) {
            acc1[key] = value;
            return acc1;
          }
          var acc = [];
          for (var i = 0, l = arr.length; i < l; i++) {
            acc = pass(acc, arr[i], i);
          }
        });
      });

      describe('Array.prototype.reduce', function() {
        benchmark(iterations, length, function() {
          arr.reduce(function(acc, value, key) {
            acc[key] = value;
            return acc;
          }, []);
        });
      });
    });
  });
});
