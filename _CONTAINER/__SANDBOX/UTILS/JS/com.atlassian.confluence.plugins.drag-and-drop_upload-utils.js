WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.atlassian.confluence.plugins.drag-and-drop:upload-utils', location = 'js/upload-utils.js' */
define("confluence-drag-and-drop/upload-utils",[],function(){var h={FILE_IS_A_FOLDER_ERROR:-602};return{ErrorCode:h,filterFiles:function(d,a,g){for(var e=[],b=0,c=0;c<a.length;c++)if(4096>=a[c].nativeFile.size){var f=new FileReader;f.onload=function(){b++;e.push(this.currentFile);b===a.length&&g(d,e)};f.onerror=function(){d.removeFile(this.currentFile);d.trigger("Error",{code:h.FILE_IS_A_FOLDER_ERROR,message:"File is a folder",file:this.currentFile});b++;b===a.length&&g(d,e)};f.currentFile=a[c];f.readAsText(a[c].nativeFile)}else b++,
e.push(a[c]),b===a.length&&g(d,e)}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-drag-and-drop/upload-utils","AJS.UploadUtils");
}catch(e){WRMCB(e)};