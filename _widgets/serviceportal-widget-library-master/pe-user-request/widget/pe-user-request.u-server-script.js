(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.header = options.header || serverOptions.header;
  options.sysId = options.sys_id || serverOptions.sys_id || '20b26776dbc2720062e479daae9619dc';
  options.showOnlyPic = options.show_only_pic || serverOptions.show_only_pic;
  options.showTitle = options.show_job_title || serverOptions.show_job_title;
  options.showCallChat = options.show_call_chat || serverOptions.show_call_chat;
})();