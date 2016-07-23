(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["paright"] = factory();
	else
		root["paright"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	function atoa(args) {
	  return [].slice.call(args);
	}

	function type(a) {
	  return Array.isArray(a) ?
	    'array' :
	    a === null ?
	      'null' :
	      typeof a;
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

	var noop = {
	  hasPattern: function() { return noop; },
	  test: function() {}
	};

	function paright(params) {
	  var args = atoa(params);
	  var o = {
	    hasPattern: function() {
	      return validate(args, parsePattern(arguments)) ?
	        noop : o;
	    },

	    test: function() {
	      throw Error('Parameters don\'t match with patterns!');
	    }
	  };

	  return o;
	}

	module.exports = paright;


/***/ }
/******/ ])
});
;