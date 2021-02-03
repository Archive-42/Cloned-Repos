var acorn = require("acorn"), walk = require("acorn/dist/walk")

/*
base.ImportDeclaration = (node, st, c) => {
  for (let i = 0; i < node.specifiers.length; i++)
    c(node.specifiers[i], st)
  c(node.source, st, "Expression")
}
base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier
*/

function modVar(name) {
  return "m_" + name.replace(/\W+/g, "_") + "__"
}

module.exports = function(code) {
  var ast = acorn.parse(code, {sourceType: "module"}), patches = []
  walk.simple(ast, {
    ImportDeclaration: function(node) {
      var req = "require(" + node.source.raw + ")", text
      if (node.specifiers.length == 0) {
        text = req
      } else if (node.specifiers.length > 1 || node.specifiers[0].type == "ImportDefaultSpecifier") {
        var name = modVar(node.source.value)
        text = "var " + name + " = " + req
        node.specifiers.forEach(function(spec) {
          if (spec.type == "ImportDefaultSpecifier")
            text += ", " + spec.local.name + " = " + name + ".default || " + name
          else if (name != null)
            text += ", " + spec.local.name + " = " + name + "." + spec.imported.name
        })
      } else {
        text = "var "
        node.specifiers.forEach(function(spec) {
          if (spec.type == "ImportNamespaceSpecifier")
            text += spec.local.name + " = " + req
          else
            text += spec.local.name + " = " + req + "." + spec.imported.name
        })
      }
      patches.push(node.start, node.end, text + ";")
    },

    ExportNamedDeclaration: function(node) {
      if (node.source) {
        var name = modVar(node.source.value)
        var text = "var " + name + " = require(" + node.source.raw + ");"
        node.specifiers.forEach(function(spec) {
          text += " exports." + spec.exported.name + " = " + name + "." + spec.local.name + ";"
        })
        patches.push(node.start, node.end, text)
      } else if (!node.declaration) {
        var text = ""
        node.specifiers.forEach(function(spec) {
          text += (text ? " " : "") + "exports." + spec.exported.name + " = " + spec.local.name + ";"
        })
        patches.push(node.start, node.end, text)
      } else if (node.declaration.type == "VariableDeclaration") {
        patches.push(node.start, node.declaration.start, "")
        node.declaration.declarations.forEach(function(decl) {
          if (!decl.init) throw new RangeError("Exporting variable without a value")
          if (decl.id.type != "Identifier") throw new RangeError("Destructuring exports not supported")
          patches.push(decl.init.start, decl.init.start, "exports." + decl.id.name + " = ")
        })
      } else {
        patches.push(node.start, node.declaration.start, "")
        patches.push(node.end, node.end, " exports." + node.declaration.id.name + " = " +
                     node.declaration.id.name + ";")
      }
    },

    ExportDefaultDeclaration: function(node) {
      if (/Declaration/.test(node.declaration.type)) {
        patches.push(node.start, node.declaration.start, "")
        patches.push(node.end, node.end, " module.exports = " + node.declaration.id.name + ";")
      } else {
        patches.push(node.start, node.declaration.start, " module.exports = ")
      }
    },

    ExportAllDeclaration: function(node) {
      throw new RangeError("Tariff does not support `export *`")
    }
  })

  var result = "", pos = code.length
  for (var i = patches.length - 3; i >= 0; i -= 3) {
    result = patches[i + 2] + code.slice(patches[i + 1], pos) + result
    pos = patches[i]
  }
  return code.slice(0, pos) + result
}
