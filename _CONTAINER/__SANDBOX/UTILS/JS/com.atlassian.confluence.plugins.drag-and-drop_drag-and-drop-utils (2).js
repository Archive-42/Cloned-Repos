WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.atlassian.confluence.plugins.drag-and-drop:drag-and-drop-utils', location = 'js/drag-and-drop-utils.js' */
define("confluence-drag-and-drop/drag-and-drop-utils",["jquery","window","ajs"],function(c,d,l){function f(a){return-1!=c.inArray("application/x-moz-file",a.dataTransfer.types)}function g(a){if(a=a||d.event)a.stopPropagation?a.stopPropagation():a.cancelBubble=!0}function h(){return!this.isFireFox30()&&-1!=c.browser.version.indexOf("1.9.")}return{defaultMimeType:"application/octet-stream",base:/^\w+:\/\/[^\/?#]+/.exec(location.href),bindDragEnter:function(a,b){if(a.addEventListener)(b=this.isFireFox35OrLater()?
this.firefox35DragEnterAndOverCallbackWrapper(b):b)&&a.addEventListener("dragenter",b,!1);else if(a.attachEvent){var e=this.ieDragEnterAndDragOverCallbackWrapper(b);a.attachEvent("ondragenter",e);c(d).unload(function(){a.detachEvent("ondragenter",e)})}},bindDragOver:function(a,b){if(a.addEventListener)this.isFireFox35OrLater()?b=this.firefox35DragEnterAndOverCallbackWrapper(b):c.browser.safari&&(b=this.safariDragOverCallbackWrapper(b)),b&&a.addEventListener("dragover",b,!1);else if(a.attachEvent){var e=
this.ieDragEnterAndDragOverCallbackWrapper(b);a.attachEvent("ondragover",e);c(d).unload(function(){a.detachEvent("ondragover",e)})}},bindDragLeave:function(a,b){b&&(c.browser.safari||this.isFireFox35OrLater()||tinymce.isIE11?a.addEventListener("dragleave",b,!1):c.browser.msie?(a.attachEvent("ondragleave",b),c(d).unload(function(){a.detachEvent("ondragleave",b)})):c.browser.mozilla&&a.addEventListener("dragexit",b,!1))},bindDrop:function(a,b){if(c.browser.mozilla){var e=this.isFireFox35OrLater()?"drop":
"dragdrop";a.addEventListener(e,this.mozillaDropCallbackWrapper(b),!1)}else if(c.browser.msie){if(b){var k=function(a){b(a);g(a)};a.attachEvent("ondrop",k);c(d).unload(function(){a.detachEvent("ondrop",k)})}}else c.browser.safari&&b&&a.addEventListener("drop",function(a){b(a);g(a)},!1)},niceSize:function(a){for(var b=" B; kB; MB; GB; TB; PB; EB; ZB; YB".split(";"),c=0,d=b.length;c<d;c++)if(a<Math.pow(2,10*(c+1)))return(c?(a/Math.pow(2,10*c)).toFixed(2):a)+b[c];return(a/Math.pow(2,10*(c+1))).toFixed(2)+
b[b.length-1]},ieDragEnterAndDragOverCallbackWrapper:function(a){return function(b){if(b=b||d.event)a&&a(b),c.browser.msie&&(b.returnValue=!1)}},safariDragOverCallbackWrapper:function(a){return function(b){(b=b||d.event)&&"file"!==b.target.type&&(a&&a(b),-1!=c.inArray("public.file-url",b.dataTransfer.types)&&b.preventDefault())}},mozillaDropCallbackWrapper:function(a){return function(b){b&&(a&&a(b),b.preventDefault(),h()?f(b)&&b.stopPropagation():b.stopPropagation())}},firefox35DragEnterAndOverCallbackWrapper:function(a){return function(b){b&&
(a&&a(b),f(b)&&b.preventDefault())}},firefox35FileDataInEvent:f,stopPropagation:g,preventDefault:function(a){if(a=a||d.event)a.preventDefault?a.preventDefault():a.returnValue=!1},isFireFox35OrLater:h,isFireFox30:function(){return-1!=c.browser.version.indexOf("1.9.0")},enableDropZoneOn:function(a,b){if(!a)throw Error("Cannot enable drop zone on invalid container. Received: "+a);b=b||l.DragAndDrop.defaultDropHandler;this.bindDragEnter(a);this.bindDragOver(a);this.bindDragLeave(a);this.bindDrop(a,b)}}});
require("confluence/module-exporter").exportModuleAsGlobal("confluence-drag-and-drop/drag-and-drop-utils","AJS.DragAndDropUtils");
}catch(e){WRMCB(e)};