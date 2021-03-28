const handlebars = require("handlebars");
const helpers = require("handlebars-helpers");
helpers.math({ handlebars });

function mergeCategories(template, categories, tagName) {
  const render = handlebars.compile(template);
  return render({ categories });
};

exports.mergeCategories = mergeCategories;
