var gulp   = require("gulp")
var uglify = require("gulp-uglify")
var concat = require("gulp-concat")
var cssMin = require("gulp-css")

gulp.task("css", function() {
  gulp.src([
    "./css/fonts/font-awesome.min.css",
    "./css/fonts/macset.css",
    "./css/normalize.css",
    "./css/polyui.css",
    "./css/style.css",
    "./css/theme.css",
    "./libraries/jqueryui/jqueryui.css",
    "./libraries/codemirror/codemirror.css",
    "./libraries/codemirror/addon/fold/foldgutter.css",
    "./libraries/codemirror/addon/lint/lint.css",
    "./libraries/codemirror/addon/dialog/dialog.css",
    "./libraries/codemirror/addon/hint/show-hint.css",
    "./libraries/alertifyjs/css/alertify.min.css",
    "./libraries/alertifyjs/css/themes/default.min.css",
    "./libraries/jqwidgets/styles/jqx.base.css",
    "./libraries/jqwidgets/styles/jqx.metro.css",
    "./libraries/jqwidgets/styles/jqx.metrodark.css",
    "./libraries/codemirror/inlet.css"
  ])
  .pipe(concat("app.css"))
  .pipe(cssMin())
  .pipe(gulp.dest("./css"))
})

gulp.task("scripts", function() {
  gulp.src([
    "./libraries/jquery/jquery.js",
    "./libraries/prefixfree/prefixfree.min.js",
    "./lib/jquery.clearsearch.js",
    "./lib/jade.js",
    "./lib/he.js",
    "./lib/html2jade.js",
    "./lib/js2coffee.js",
    "./lib/stylus.min.js",
    "./lib/css2stylus.js",
    "./lib/jsbeautify/beautify.js",
    "./lib/jsbeautify/beautify-css.js",
    "./lib/jsbeautify/beautify-html.js",
    "./lib/jsbeautify/unpackers/javascriptobfuscator_unpacker.js",
    "./lib/jsbeautify/unpackers/urlencode_unpacker.js",
    "./lib/jsbeautify/unpackers/p_a_c_k_e_r_unpacker.js",
    "./lib/jsbeautify/unpackers/myobfuscate_unpacker.js",
    "./libraries/jszip/jszip.min.js",
    "./libraries/jszip/jszip-utils.js",
    "./libraries/jszip/FileSaver.js",
    "./libraries/jszip/Blob.js",
    "./libraries/alertifyjs/alertify.min.js",
    "./libraries/showdown/Showdown.min.js",
    "./libraries/codemirror/codemirror.js",
    "./libraries/codemirror/javascripts/code-completion.js",
    "./libraries/codemirror/javascripts/css-completion.js",
    "./libraries/codemirror/javascripts/html-completion.js",
    "./libraries/codemirror/mode/javascript/javascript.js",
    "./libraries/codemirror/mode/xml/xml.js",
    "./libraries/codemirror/mode/css/css.js",
    "./libraries/codemirror/mode/htmlmixed/htmlmixed.js",
    "./libraries/codemirror/mode/ruby/ruby.js",
    "./libraries/codemirror/mode/jade/jade.js",
    "./libraries/codemirror/mode/haml/haml.js",
    "./libraries/codemirror/addon/edit/closetag.js",
    "./libraries/codemirror/addon/edit/matchbrackets.js",
    "./libraries/codemirror/addon/selection/active-line.js",
    "./libraries/codemirror/addon/fold/foldcode.js",
    "./libraries/codemirror/addon/fold/foldgutter.js",
    "./libraries/codemirror/addon/fold/brace-fold.js",
    "./libraries/codemirror/addon/fold/xml-fold.js",
    "./libraries/codemirror/addon/fold/comment-fold.js",
    "./libraries/codemirror/addon/search/search.js",
    "./libraries/codemirror/addon/search/searchcursor.js",
    "./libraries/codemirror/addon/dialog/dialog.js",
    "./libraries/codemirror/addon/hint/show-hint.js",
    "./libraries/codemirror/addon/hint/xml-hint.js",
    "./libraries/codemirror/addon/hint/html-hint.js",
    "./libraries/codemirror/addon/hint/css-hint.js",
    "./libraries/codemirror/addon/hint/javascript-hint.js",
    "./libraries/codemirror/addon/htmlPalette.js",
    "./libraries/codemirror/addon/cssPalette.js",
    "./libraries/codemirror/addon/jsPalette.js",
    "./libraries/codemirror/addon/search/searchcursor.js",
    "./libraries/codemirror/addon/search/goto-line.js",
    "./libraries/codemirror/csslint.js",
    "./libraries/codemirror/jshint.js",
    "./libraries/codemirror/addon/lint/lint.js",
    "./libraries/codemirror/addon/lint/html-lint.js",
    "./libraries/codemirror/addon/lint/css-lint.js",
    "./libraries/codemirror/addon/lint/javascript-lint.js",
    "./libraries/codemirror/coffee-script.js",
    "./libraries/codemirror/coffeelint.js",
    "./libraries/codemirror/mode/coffeescript/coffeescript.js",
    "./libraries/codemirror/addon/lint/coffeescript-lint.js",
    "./libraries/codemirror/mode/sass/sass.js",
    "./libraries/codemirror/mode/stylus/stylus.js",
    "./libraries/codemirror/mode/jade/jade.js",
    "./libraries/codemirror/markdown.js",
    "./libraries/codemirror/continuelist.js",
    "./libraries/codemirror/inlet.min.js",
    "./libraries/codemirror/emmet.js",
    "./lib/htmlhint-custom.js",
    "./lib/htmlTidy.js",
    "./lib/cssTidy.js",
    "./lib/jsTidy.js"
  ])
  .pipe(concat("app.js"))
  .pipe(uglify())
  .pipe(gulp.dest("./js"))
})

//gulp.task("scripts", function() {
//  gulp.src([
//    "./libraries/jqwidgets/jqxcore.js",
//    "./libraries/jqwidgets/jqxsplitter.js",
//    "./lib/shortcut.js",
//    "./vars.js",
//    "./main.js",
//    "./editor.js",
//    "./lib/hscroll.js"
//  ])
//  .pipe(concat("app.js"))
//  .pipe(uglify())
//  .pipe(gulp.dest("./"))
//})

gulp.task("default", ["css", "scripts"])