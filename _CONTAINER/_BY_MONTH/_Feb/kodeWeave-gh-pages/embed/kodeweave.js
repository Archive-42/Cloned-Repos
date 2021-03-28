// Show Editors If URL Contains Them
// If domain is HTTP
var site = window.location;
site = site.toString();
if (site.substring(0, 7) === "http://") {
  window.location.href = "https://" + site.substring(7, site.length);
}

// Fix libraries url direction to load sources 
$(".libsources").each(function() {
  $(this).val(this.value.replace(/libraries/g,"../editor/libraries"));
});

// Initialize Open and Close for HTML editor
var openHTML = CodeMirror(document.querySelector("#openHTML"), {
  mode: "text/html",
  value: "<!DOCTYPE html><html><head>"
});
var closeHTML = CodeMirror(document.querySelector("#closeHTML"), {
  mode: "text/html",
  value: "<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n"
});
var closeRefs = CodeMirror(document.querySelector("#closeRefs"), {
  mode: "text/html",
  value: "  </head>\n  <body>\n"
});
var closeFinal = CodeMirror(document.querySelector("#closeFinal"), {
  mode: "text/html",
  value: "\n  </body>\n</html>"
});

var sass = new Sass(),
    str  = window.location.href,
    url  = window.location.hash,
    hash = window.location.hash,
    htmlContent, cssContent, jsContent, cssSelected;

// Live preview
function updatePreview() {
  $(".preview-frame").empty();
  var frame = document.createElement("iframe");
  frame.setAttribute("id", "preview");
  frame.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts");
  document.querySelector(".preview-frame").appendChild(frame);
  
  var previewFrame = document.getElementById("preview");
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
  var heading = openHTML.getValue() + closeHTML.getValue() + $("[data-action=library-code]").val() + "<link rel=\"stylesheet\" href=\"../editor/libraries/font-awesome/font-awesome.css\"><link rel=\"stylesheet\" href=\"../editor/libraries/font-awesome/macset.css\">\n" + "<script src=\"    ../editor/lib/screenlog.js\"></script>";
  // var heading = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n";
  preview.open();
  var htmlSelected = $("#html-preprocessor option:selected").val();
  var jsSelected   = $("#js-preprocessor   option:selected").val();

  cssPreProcessor();

  if ( jsSelected == "none") {
    jsContent = "<script>screenLog.init({ autoScroll: false });</script><script>" + jsEditor.getValue() + "</script>";
  } else if ( jsSelected == "coffeescript") {
    jsContent = "<script>screenLog.init({ autoScroll: false });</script><script>" + CoffeeScript.compile(jsEditor.getValue(), { bare: true }) + "</script>";
  } else if ( jsSelected == "typescript") {
    jsContent = "<script>screenLog.init({ autoScroll: false });</script><script type=\"text/typescript\">" + jsEditor.getValue() + "</script>\n  <script type=\"text/javascript\" src='../editor/lib/typescript.min.js'></script>\n  <script type=\"text/javascript\" src='../editor/lib/typescript.compile.min.js'></script>";
  } else if ( jsSelected == "babel") {
    var result = Babel.transform(jsEditor.getValue(), {
      presets: ['latest', 'stage-2', 'react']
    });
    jsContent = "<script>screenLog.init({ autoScroll: false });\n\n" + result.code + "</script>";
  }

  if ( htmlSelected == "none") {
    htmlContent = heading + "<style id='b8c770cc'>" + cssContent + "</style>" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    " + jsContent + closeFinal.getValue();
    preview.write(htmlContent);
  } else if ( htmlSelected == "jade") {
    var options = {
        pretty: true
    };
    var jade2HTML = jade.render(htmlEditor.getValue(), options);
    htmlContent = heading + "<style id='b8c770cc'>" + cssContent + "</style>" + closeRefs.getValue() + "\n" + jade2HTML + jsContent + closeFinal.getValue();
    preview.write(htmlContent);
  }
  preview.close();
}

document.querySelector("[data-action=rerun]").onclick = function(e) {
  e.preventDefault();
  updatePreview();
};
function loadgist(gistid) {
  $.ajax({
    url: "https://api.github.com/gists/" + gistid,
    type: "GET",
    dataType: "jsonp",
    jsonp: "callback"
  }).success(function(gistdata) {
    var htmlVal    = gistdata.data.files["index.html"];
    var jadeVal    = gistdata.data.files["index.jade"];
    var cssVal     = gistdata.data.files["index.css"];
    var stylusVal  = gistdata.data.files["index.styl"];
    var lessVal    = gistdata.data.files["index.less"];
    var scssVal    = gistdata.data.files["index.scss"];
    var sassVal    = gistdata.data.files["index.sass"];
    var jsVal      = gistdata.data.files["index.js"];
    var coffeeVal  = gistdata.data.files["index.coffee"];
    var tsVal      = gistdata.data.files["index.ts"];
    var babelVal   = gistdata.data.files["index.jsx"];
    var mdVal      = gistdata.data.files["README.md"];
    var libraries  = gistdata.data.files["libraries.json"].content;
    var jsonLibs   = JSON.parse(libraries);

    // Return libraries from json
    $.each(jsonLibs, function(name, value) {
      $(".ldd-submenu #" + name).prop("checked", value).trigger("keyup");
    });

    // Set checked libraries into preview
    $("#jquery").trigger("keyup");

    // Return the editor's values
    if (mdVal) {
      mdEditor.setValue(mdVal.content);
    }
    if (!mdVal) {
      $("[data-target=mdEditor]").addClass("hide");
    }
    if (htmlVal) {
      htmlEditor.setValue(htmlVal.content);
      $("#html-preprocessor").val("none").change();
    }
    if (jadeVal) {
      htmlEditor.setValue(jadeVal.content);
      $("#html-preprocessor").val("jade").change();
      $("[data-target=htmlEditor]").text("Pug");
    }
    if (!htmlVal && !jadeVal) {
      $("[data-target=htmlEditor]").addClass("hide");
    }
    if (cssVal) {
      cssEditor.setValue(cssVal.content);
      $("#css-preprocessor").val("none").change();
    }
    if (stylusVal) {
      cssEditor.setValue(stylusVal.content);
      $("#css-preprocessor").val("stylus").change();
      $(window).on("load resize", function() {
        if ( $(this).width() <= 420 ) {
          $("[data-target=cssEditor]").text("Styl");
        } else {
          $("[data-target=cssEditor]").text("Stylus");
        }
      });
    }
    if (lessVal) {
      cssEditor.setValue(lessVal.content);
      $("#css-preprocessor").val("less").change();
      $("[data-target=cssEditor]").text("LESS");
    }
    if (scssVal) {
      cssEditor.setValue(scssVal.content);
      $("#css-preprocessor").val("scss").change();
      $("[data-target=cssEditor]").text("SCSS");
    }
    if (sassVal) {
      cssEditor.setValue(sassVal.content);
      $("#css-preprocessor").val("sass").change();
      $("[data-target=cssEditor]").text("SASS");
    }
    if (!cssVal && !stylusVal && !lessVal && !scssVal && !sassVal) {
      $("[data-target=cssEditor]").addClass("hide");
    }
    if (jsVal) {
      jsEditor.setValue(jsVal.content);
      $("#js-preprocessor").val("none").change();
      jsContent = "<script>" + jsEditor.getValue() + "</script>";
      $(window).on("load resize", function() {
        if ( $(this).width() <= 420 ) {
          $("[data-target=jsEditor]").text("JS");
        } else {
          $("[data-target=jsEditor]").text("JavaScript");
        }
      });
    }
    if (coffeeVal) {
      jsEditor.setValue(coffeeVal.content);
      $("#js-preprocessor").val("coffeescript").change();
      jsContent = "<script>" + CoffeeScript.compile(jsEditor.getValue(), { bare: true }) + "</script>";
      $(window).on("load resize", function() {
        if ( $(this).width() <= 420 ) {
          $("[data-target=jsEditor]").text("Coffee");
        } else {
          $("[data-target=jsEditor]").text("CoffeeScript");
        }
      });
    }
    if (tsVal) {
      jsEditor.setValue(tsVal.content);
      $("#js-preprocessor").val("typescript").change();
      jsContent = "<script type='text/typescript'>" + jsEditor.getValue() + "</script>";
      $(window).on("load resize", function() {
        if ( $(this).width() <= 420 ) {
          $("[data-target=jsEditor]").text("TS");
        } else {
          $("[data-target=jsEditor]").text("TypeScript");
        }
      });
    }
    if (babelVal) {
      $("#js-preprocessor").val("babel").trigger("change");
      jsEditor.setValue(babelVal.content);
      $(window).on("load resize", function() {
        $("[data-target=jsEditor]").text("Babel");
      });
    }
    if (!jsVal && !coffeeVal && !tsVal && !babelVal) {
      jsEditor.setValue("");
    }
    $(".preloader").remove();
    setTimeout(function() {
      $(".mainmenu a:not(.hide):first").trigger("click");
    }, 500);
  }).error(function(e) {
    // ajax error
    $(".preloader").remove();
    console.warn("Error: Could not load weave!", e);
    alertify.error("Error: Could not load weave!");
  });
}

// Render Chosen Preprocessor
function cssPreProcessor(cssSelected) {
  cssSelected = $("#css-preprocessor  option:selected").val();

  if (cssSelected == "none") {
    cssContent = cssEditor.getValue();
    $("#preview").contents().find("#b8c770cc").html(cssContent);
  } else if (cssSelected == "stylus") {
    var cssVal = cssEditor.getValue();
    stylus(cssVal).render(function(err, out) {
      if(err !== null) {
        console.error("something went wrong");
      } else {
        cssContent = out;
        $("#preview").contents().find("#b8c770cc").html(cssContent);
      }
    });
  } else if ( cssSelected == "less") {
    less.render(cssEditor.getValue(), function (e, output) {
      yourCSS = output.css;
      $("#preview").contents().find("#b8c770cc").html(yourCSS);
    });
  } else if (cssSelected == "scss" || cssSelected == "sass") {
    var cssVal = cssEditor.getValue();

    sass.compile(cssVal, function(result) {
      yourCSS = result.text; $("#preview").contents().find("#b8c770cc").html(yourCSS);
    });
  }
}

// If url doesn't contain a hash launch editor
if (!url) {
  $(document.body).append('<div class="fixedfill preloader"></div>');
  $(".preloader").html('<div class="table"><div class="cell"><h1>No weave detected!</h1><a class="launcheditor" href="../editor" target="_blank">Launch Editor!</a></div></div><style>.launcheditor {\n  position: relative;\n  background: #4e92a2;\n  color: #fff;\n  padding: 1em 2em;\n  font-size: 14px;\n  top: 15px;\n}\n\n.launcheditor:hover {\n  background: #57b5cc;\n}\n\n.launcheditor:active {\n  background: #407c8a;\n}</style>');
} else {
  // Show Editors If URL Contains Them
  if (url.indexOf("?") > -1) {
    $("[data-target=mdEditor]").addClass("hide");
    $("[data-target=htmlEditor]").addClass("hide");
    $("[data-target=cssEditor]").addClass("hide");
    $("[data-target=jsEditor]").addClass("hide");
    $("[data-target=preview]").addClass("hide");

    if (url.indexOf("md") > -1) {
      $("[data-target=mdEditor]").removeClass("hide");
      mdeditor.checked = true;
    }
    if (url.indexOf("html") > -1) {
      $("[data-target=htmlEditor]").removeClass("hide");
      htmleditor.checked = true;
    }
    if (url.indexOf("css") > -1) {
      $("[data-target=cssEditor]").removeClass("hide");
      csseditor.checked = true;
    }
    if (url.indexOf("js") > -1) {
      $("[data-target=jsEditor]").removeClass("hide");
      jseditor.checked = true;
    }
    if (url.indexOf("result") > -1) {
      $("[data-target=preview]").removeClass("hide");
      previeweditor.checked = true;
    }
    if (url.indexOf("edit") > -1) {
      // Initialize HTML editor
      var htmlEditor = CodeMirror(document.getElementById("htmlEditor"), {
        mode: "text/html",
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        value: ""
      });
      Inlet(htmlEditor);
      var cssEditor = CodeMirror(document.getElementById("cssEditor"), {
        mode: "text/css",
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      });
      Inlet(cssEditor);
      var jsEditor = CodeMirror(document.getElementById("jsEditor"), {
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        foldGutter: true,
        dragDrop: true,
        lint: false,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: {name: "javascript", globalVars: false}
      });
      Inlet(jsEditor);
      var mdEditor = CodeMirror(document.getElementById("mdEditor"), {
        mode: "text/x-markdown",
        theme: "default",
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        gutters: ["CodeMirror-linenumbers"]
      });
      Inlet(mdEditor);

      htmlEditor.on("change", function() {
        updatePreview();
      });
      cssEditor.on("change", function() {
        cssPreProcessor();

        setTimeout(function() {
          cssEditor.setOption("paletteHints", "true");
        }, 300);
      });
      jsEditor.on("change", function() {
        updatePreview();
      });
    }
    if (url.indexOf("edit") === -1) {
      // Initialize HTML editor
      var htmlEditor = CodeMirror(document.getElementById("htmlEditor"), {
        mode: "text/html",
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        foldGutter: true,
        readOnly: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        value: ""
      });
      var cssEditor = CodeMirror(document.getElementById("cssEditor"), {
        mode: "text/css",
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        foldGutter: true,
        readOnly: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      });
      var jsEditor = CodeMirror(document.getElementById("jsEditor"), {
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        foldGutter: true,
        dragDrop: true,
        readOnly: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: {name: "javascript", globalVars: false}
      });
      var mdEditor = CodeMirror(document.getElementById("mdEditor"), {
        mode: "text/x-markdown",
        theme: "default",
        tabMode: "indent",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        readOnly: true,
        gutters: ["CodeMirror-linenumbers"]
      });

      htmlEditor.on("change", function() {
        updatePreview();
      });
      cssEditor.on("change", function() {
        cssPreProcessor();

        setTimeout(function() {
          cssEditor.setOption("paletteHints", "true");
        }, 300);
      });
      jsEditor.on("change", function() {
        updatePreview();
      });
    }
    if (url.indexOf("dark") > -1) {
      mdEditor.setOption("theme", "kwdark");
      htmlEditor.setOption("theme", "kwdark");
      cssEditor.setOption("theme", "kwdark");
      jsEditor.setOption("theme", "kwdark");
      $("header").css("background", "#2c323b");
      $("header a").css("color", "#a3b7c7");
    }
    if (url.indexOf("transparent") > -1) {
      $(".CodeMirror, .CodeMirror *").css("background", "transparent!important");
    }
    if (url.indexOf("transparent") === -1) {
      $(".editor, .result").css("z-index", "1");
    }
    if (url.indexOf("norerun") > -1) {
      $(".rerun").remove();
    }

    setTimeout(function() {
      /*
        If URL does not contain "result"
        remove iframe#preview for faster render
      */
      if ($("[data-target=mdEditor]").hasClass("hide")) {
        $("#mdEditor").remove();
      }
      if ($("[data-target=htmlEditor]").hasClass("hide")) {
        $("#htmlEditor").remove();
      }
      if ($("[data-target=cssEditor]").hasClass("hide")) {
        $("#cssEditor").remove();
      }
      if ($("[data-target=jsEditor]").hasClass("hide")) {
        $("#jsEditor").remove();
      }
      if ($("[data-target=preview]").hasClass("hide")) {
        $("#preview").remove();
      }
    }, 300);
    setTimeout(function() {
      $(".mainmenu .hide").remove();
      $(".mainmenu a:not(.hide):first").trigger("click");
    }, 500);
  } else {
    window.location.href = "https://michaelsboost.github.io/kodeWeave/embed/" + url + "?md,html,css,js,result";
  }
  
  // Handles Menubar
  // 617 for width
  $(".mainmenu a").on("click", function(e) {
    if ( $(".selected").is(":visible") ) {
      $(".mainmenu a").removeClass("selected");
    }
    if ( $(window).width() <= 617 ) {
      // Small Phones
      $(this).addClass("selected");

      $("#mdEditor").addClass("hide");
      $("#htmlEditor").addClass("hide");
      $("#cssEditor").addClass("hide");
      $("#jsEditor").addClass("hide");
      if (url.indexOf("?") > -1) {
        if (url.indexOf("transparent") > -1) { 
          // Don't do anything with preview
        } else {
          $("#preview").addClass("hide");
        }
      }
      $("#" + $(this).attr("data-target")).removeClass("hide");
    } else {
      // Large Tablets
      if ( $(this).attr("data-target").toLowerCase() === "preview" ) {
        return false;
      }
      $(this).addClass("selected");

      $("#mdEditor").addClass("hide");
      $("#htmlEditor").addClass("hide");
      $("#cssEditor").addClass("hide");
      $("#jsEditor").addClass("hide");
      $("#" + $(this).attr("data-target")).removeClass("hide");
    }

    mdEditor.refresh();
    htmlEditor.refresh();
    cssEditor.refresh();
    jsEditor.refresh();

    setTimeout(function() {
      mdEditor.setOption("paletteHints", "true");
      htmlEditor.setOption("paletteHints", "true");
      cssEditor.setOption("paletteHints", "true");
      jsEditor.setOption("paletteHints", "true");
      return false;
    }, 300);
    return false;
  });

  $(window).on("load resize", function() {
    if (previeweditor.checked === true) {
      if (mdeditor.checked || htmleditor.checked || csseditor.checked || jseditor.checked) {
        if ( $(this).width() <= 617 ) {
          $(".editor").css("width", "100%");
          $(".preview-editor").css("left", "0");
          $("[data-target=preview]").show();
        } else {
          $(".editor").css("width", "50%");
          $(".preview-editor").css("left", "50%");
          if ($("[data-target=preview]").hasClass("selected")) {
            $("[data-target=preview]").hide().removeClass("selected");
            setTimeout(function() {
              $(".mainmenu a:not(.hide):first").trigger("click");
            });
          } else {
            $("[data-target=preview]").hide();
            $("#preview").show();
          }
        }

        if ( $(this).width() <= 420 ) {
          $("[data-target=mdEditor]").text("MD");
        } else {
          $("[data-target=mdEditor]").text("Markdown");
        }
      } else {
        $("header, .rerun").remove();
        $(".editor").css("width", "100%");
        $("#editors, .preview-editor").css("top", "0");
        $("#editors").css("bottom", "0");
        $(".preview-editor").css("left", "0");
        $(".preview-editor").css("height", "calc(100vh - 4px)");
        $("[data-target=preview]").show();
      }
    }
  });

  var myarray = [],
      current = 1,
      download_to_textbox = function (url, el) {
        return $.get(url, null, function (data) {
          el.val(data);
        }, "text");
      },
      download_to_editor = function (url, el) {
        return $.get(url, null, function (data) {
          el.setValue(data);
        }, "text");
      };

  // Load Embeded Weave
  var hash = window.location.hash.substring(1);
//  $(document.body).append('<div class="fixedfill preloader" style="background: radial-gradient(ellipse at center, rgba(122, 188, 255, 0.85) 0%, rgba(64, 150, 238, 0.87) 100%)!important; color: #fff!important;"></div>');
//  $(".preloader").html('<div class="table"><div class="cell"><h1>Loading Weave!</h1><div class="spinner"><div class="bounce1" style="background: #fff!important;"></div><div class="bounce2" style="background: #fff!important;"></div><div class="bounce3" style="background: #fff!important;"></div></div></div></div>');
  $(document.body).append('<div class="fixedfill preloader" style="background: #fff;"></div>');
  $(".preloader").html('<div class="table"><div class="cell"><img class="spin" src="assets/loading.svg"></div></div>');
//  $(document.body).append('<div class="fixedfill preloader" style="background: #fff;"></div>');
//  $(".preloader").html('<div class="table"><div class="cell"><img src="assets/loading-animation.svg" style="width: 30%;"></div></div>');
  loadgist(hash);
  updatePreview();

  // Edit on kodeWeave Link
  $(".logo").attr("href", "https://michaelsboost.github.io/kodeWeave/editor/#" + hash.substring(0, hash.indexOf('?'))).attr("target", "_blank");

  // Setup Preprocessors
  $(".settings").on("click", function() {
    $(".preprocessor").addClass("hide");
    if ($(this).hasClass("htmlSetting")) {
      $(".html-preprocessor").removeClass("hide");
    } else if ($(this).hasClass("cssSetting")) {
      $(".css-preprocessor").removeClass("hide");
    } else if ($(this).hasClass("jsSetting")) {
      $(".js-preprocessor").removeClass("hide");
    }
    if ($("#html-preprocessor").val() == "none") {
      if (!htmlEditor.getValue) {
        $(".html-preprocessor-convert").addClass("hide");
      }
    } else if ($("#html-preprocessor").val() == "jade") {
      if (!htmlEditor.getValue) {
        $(".html-preprocessor-convert").addClass("hide");
      }
    }
    if ($("#js-preprocessor").val() == "none") {
      if (!jsEditor.getValue) {
        $(".js-preprocessor-convert").addClass("hide");
      }
    } else if ($("#js-preprocessor").val() == "coffeescript") {
      if (!jsEditor.getValue) {
        $(".js-preprocessor-convert").addClass("hide");
      }
    }
    $("[data-action=preprocessors]").fadeIn();
  });
  // Preprocessors (Doesn't compile to preview)
  $("#html-preprocessor").on("change", function() {
    var valueSelected = this.value;
    if ( valueSelected == "none") {
      htmlEditor.setOption("mode", "text/html");
      htmlEditor.setOption("gutters", ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
      // htmlEditor.refresh();
    } else if ( valueSelected == "jade") {
      htmlEditor.setOption("mode", "text/x-jade");
      htmlEditor.setOption("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
      // htmlEditor.refresh();
    } else {
      htmlEditor.setOption("mode", "text/html");
      htmlEditor.setOption("gutters", ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
      // htmlEditor.refresh();
    }
    updatePreview();
  }).trigger("change");
  $("#css-preprocessor").on("change", function() {
    var valueSelected = this.value;
    if ( valueSelected == "none") {
      cssEditor.setOption("mode", "text/css");
      cssEditor.setOption("gutters", ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
      // cssEditor.refresh();
    } else if ( valueSelected == "stylus") {
      cssEditor.setOption("mode", "text/x-styl");
      cssEditor.setOption("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
      // cssEditor.refresh();
    } else if ( valueSelected == "less") {
      cssEditor.setOption("mode", "text/x-less");
      cssEditor.setOption("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
      // cssEditor.refresh();
    } else {
      cssEditor.setOption("mode", "text/css");
      cssEditor.setOption("gutters", ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
      // cssEditor.refresh();
    }
    updatePreview();
  }).trigger("change");
  $("#js-preprocessor").on("change", function() {
    var valueSelected = this.value;
    if ( valueSelected == "none") {
      jsEditor.setOption("mode", "text/javascript");
      // jsEditor.refresh();
      $(".jsvalidator").show();
    } else if ( valueSelected == "coffeescript") {
      jsEditor.setOption("mode", "text/x-coffeescript");
      // jsEditor.refresh();
    } else if ( valueSelected == "typescript") {
      jsEditor.setOption("mode", "text/typescript");
      // jsEditor.refresh();
    } else if ( valueSelected == "babel") {
      jsEditor.setOption("mode", "text/javascript");
      // jsEditor.refresh();
    } else {
      $(".jsvalidator").show();
      jsEditor.setOption("mode", "text/javascript");
      // jsEditor.refresh();
    }
    updatePreview();
  }).trigger("change");

  // Save Checked Libraries for LocalStorage
  var textarea = document.querySelector("[data-action=library-code]");

  // Add/Remove Libraries
  $("[data-action=check]").on("change keyup", function() {
    var value = $(this).parent().nextAll("div").children(".libsources:first").val() + "\n";

    if ( $(this).prop("checked") === true ) {
      textarea.value = textarea.value + value;
    } else {
      textarea.value = textarea.value.replace( value, "");
    }

    var checked = $("[type=checkbox].check:checked");
    var lsChecked = [];
    for (var i = 0, iLen = checked.length; i < iLen; i++) {
      lsChecked.push($(checked[i]).attr('id'));
    }
  });
  $("#jquery").trigger("keyup");
}
