function atoa(args) {
  return [].slice.call(args);
}

function type(a) {
  if (a !== a) { return 'nan'; }
  if (a === null) { return 'null'; }
  return Array.isArray(a) ? 'array' : typeof a;
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
    var tp = type(args[i]);
    var valid = pattern[i]
      .some(function(p) {
        return p === tp;
      });
    if (!valid) { return false; }
  }

  return true;
}

function noop() {}

function paright(params) {
  var args = atoa(params);
  var o = {
    hasPattern: function() {
      var valid = validate(args, parsePattern(arguments));
      if (valid) {
        o.hasPattern = function() { return o; }
        o.test = noop;
      }
      return o;
    },

    test: function() {
      throw Error('Parameters don\'t match with patterns!');
    }
  };

  return o;
}

module.exports = paright;
