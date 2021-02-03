var api = new Mesibo();
api.setAppName("webdevhub");
api.setListener(new MesiboListener());
api.setCredentials( '	2c5dk7fcbcotqj7jgz5f0rf8jzpajrvcsi4gvbrs0mzzwlllwudy637v25vpkab6' );
api.start();
function MesiboListener() {
}

MesiboListener.prototype.Mesibo_OnConnectionStatus = function(status, value) {
	console.log("TestNotify.prototype.Mesibo_OnConnectionStatus: "  + status);
}

MesiboListener.prototype.Mesibo_OnMessageStatus = function(m) {
	console.log("TestNotify.prototype.Mesibo_OnMessageStatus: from "  
			+ m.peer + " status: " + m.status);
}

MesiboListener.prototype.Mesibo_OnMessage = function(m, data) {
	console.log("TestNotify.prototype.Mesibo_OnMessage: from "  + m.peer);
}
