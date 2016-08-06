function isArray(a) {
  return {}.toString.call(a) === '[object Array]';
}

function atoa(args) {
  return [].slice.call(args);
}

function type(a) {
  if (a !== a) { return 'nan'; }
  if (a === null) { return 'null'; }
  return isArray(a) ? 'array' : typeof a;
}

function parsePattern(params) {
  return atoa(params)
    .map(function(arg) {
      return arg.split('|');
    });
}

function validate(args, pattern) {
  if (args.length !== pattern.length) {
    return false;
  }

  for (var i = args.length - 1; i >= 0; i--) {
    var typ = type(args[i]);
    var valid = ~pattern[i].indexOf(typ);
    if (!valid) { return false; }
  }

  return true;
}

function paright(params) {
  var args = atoa(params);
  var matched = false;
  var extractor = {};
  var o = {
    hasPattern: function() {
      if (!matched) {
        matched = validate(args, parsePattern(arguments));
      }
      return o;
    },

    extract: function() {
      if (matched) {
        atoa(arguments)
          .map(function(value) {
            return type(value) === 'array' ?
              value :
              [value, void 0];
          })
          .forEach(function(value, index) {
            var key = value[0];
            var dft = value[1];
            extractor[key] = type(args[index]) !== 'undefined' ?
              args[index] :
              dft;
          });

        o.extract = function() { return o; }
      }
      return o;
    },

    test: function() {
      if (!matched) {
        throw Error('Parameters don\'t match with patterns!');
      }
      return extractor;
    }
  };

  return o;
}

module.exports = paright;
