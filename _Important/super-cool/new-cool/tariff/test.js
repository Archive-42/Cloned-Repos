var tariff = require("./index")

var cases = {
  'import foo from "bar"': 'var m_bar__ = require("bar"), foo = m_bar__.default || m_bar__;',
  'import * as foo from "bar"': 'var foo = require("bar");',
  'import {foo} from "bar"': 'var foo = require("bar").foo;',
  'import {foo as baz} from "bar"': 'var baz = require("bar").foo;',
  'import {foo, baz} from "bar"': 'var m_bar__ = require("bar"), foo = m_bar__.foo, baz = m_bar__.baz;',
  'import {foo, baz as quux} from "bar"': 'var m_bar__ = require("bar"), foo = m_bar__.foo, quux = m_bar__.baz;',
  'import * as foo from "bar"\n"more code"': 'var foo = require("bar");\n"more code"',

  'export function bar() {}': 'function bar() {} exports.bar = bar;',
  'export class baz {}': 'class baz {} exports.baz = baz;',
  'export function bar() {} 1': 'function bar() {} exports.bar = bar; 1',
  'export default function bar() {}': 'function bar() {} module.exports = bar;',
  'export var x = 10': 'var x = exports.x = 10',
  'export var x = 10, y = 20': 'var x = exports.x = 10, y = exports.y = 20',
  'export {a, b}': 'exports.a = a; exports.b = b;',
  'export {a, b as c}': 'exports.a = a; exports.c = b;'
}

for (var code in cases) {
  var result = tariff(code)
  if (cases[code] != result) console.log("  failed! wanted\n" + cases[code] + "\n  got\n" + result)
}
