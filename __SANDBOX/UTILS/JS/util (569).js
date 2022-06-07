(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.util = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lesserEquals = lesserEquals;
  exports.biggerEquals = biggerEquals;
  exports.defaultCompare = defaultCompare;
  exports.defaultEquals = defaultEquals;
  exports.defaultToString = defaultToString;
  exports.swap = swap;
  exports.reverseCompare = reverseCompare;
  exports.defaultDiff = defaultDiff;
  var Compare = exports.Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
  };

  var DOES_NOT_EXIST = exports.DOES_NOT_EXIST = -1;

  function lesserEquals(a, b, compareFn) {
    var comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
  }

  function biggerEquals(a, b, compareFn) {
    var comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
  }

  function defaultCompare(a, b) {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }

  function defaultEquals(a, b) {
    return a === b;
  }

  function defaultToString(item) {
    if (item === null) {
      return 'NULL';
    }if (item === undefined) {
      return 'UNDEFINED';
    }if (typeof item === 'string' || item instanceof String) {
      return '' + item;
    }
    return item.toString();
  }

  function swap(array, a, b) {
    var _ref = [array[b], array[a]];
    array[a] = _ref[0];
    array[b] = _ref[1];
  }
  function reverseCompare(compareFn) {
    return function (a, b) {
      return compareFn(b, a);
    };
  }

  function defaultDiff(a, b) {
    return Number(a) - Number(b);
  }
});