var test = require('ava');
var rewire = require('rewire');

var paright = rewire('../index.js');
var type = paright.__get__('type');
var pp = paright.__get__('parsePattern');

test('type function', t => {
  t.is(type(NaN), 'nan');
  t.is(type(true), 'boolean');
  t.is(type(1), 'number');
  t.is(type(''), 'string');
  t.is(type({}), 'object');
  t.is(type([]), 'array');
  t.is(type(null), 'null');
});

test('parsePattern function', t => {
  var testFn = function(/**/) {
    return pp(arguments);
  };

  t.deepEqual(
    testFn('boolean', 'number|string', 'object|array|null'),
    [['boolean'], ['number', 'string'], ['object', 'array', 'null']]
  );
});

test('paright function', t => {
  var testFn = function() {
    paright(arguments)
      .hasPattern('boolean', 'number', 'string', 'object', 'array', 'null')
      .hasPattern('boolean', 'object|array')
      .hasPattern('boolean')
      .test();
  };

  // true cases
  t.notThrows(() => testFn(true, 1, '', {}, [], null));
  t.notThrows(() => testFn(true, {}));
  t.notThrows(() => testFn(true, []));

  // false cases
  t.throws(() => testFn(1));
  t.throws(() => testFn());
  t.throws(() => testFn(true, 1));
});
