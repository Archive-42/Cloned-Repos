const handlebars = require("handlebars");
const helpers = require("handlebars-helpers");
helpers.math({ handlebars });

function mergeItems(template, items) {
  const render = handlebars.compile(template);
  return render({ items });
}

exports.mergeItems = mergeItems;
