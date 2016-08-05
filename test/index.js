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
  var empty = {};
  var testFn = function() {
    return paright(arguments)
      .hasPattern('boolean', 'number', 'string', 'object', 'array', 'null')
      .extract('bo', 'nu', 'st')
      .hasPattern('boolean', 'object|array')
      .hasPattern('boolean')
      .extract('bo', ['ob', empty])
      .test();
  };

  // true cases
  t.notThrows(() => testFn(true, 1, '', {}, [], null), '1');
  t.notThrows(() => testFn(true, {}), '2');
  t.notThrows(() => testFn(true, []), '3');
  t.notThrows(() => testFn(true), '4');

  // false cases
  t.throws(() => testFn(1));
  t.throws(() => testFn());
  t.throws(() => testFn(true, 1));

  // extract
  t.deepEqual(testFn(true, 1, 's', {}, [], null), { bo: true, nu: 1, st: 's'});
  t.deepEqual(testFn(false, []), { bo: false, ob: [] });
  t.deepEqual(testFn(true), { bo: true, ob: {} });
});
