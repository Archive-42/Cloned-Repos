# Tariff

```
var tariff = import("tariff")
tariff('import {foo} from "./bar"\nexport let baz = foo(1)')
// -> 'var foo = require("./bar").foo\nlet baz = exports.baz = foo(1)'
```

If you treat exports as values, not bindings, and don't do anything
fancy, you can use tariff to convert ES6 `import` and `export`
declarations into CommonJS equivalents.

Released under an MIT license.
