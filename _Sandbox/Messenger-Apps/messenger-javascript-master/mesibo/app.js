//app.js





function MesiboApp(s) {
	// MesiboLog('MesiboApp', s);
	this.scope = s;
	this.api = {};
	this.init();
}

MesiboApp.prototype.init = function() {
	this.api = this.scope.getMesibo();
}

MesiboApp.prototype.displayContacts = function(contacts){
	if(!contacts)	
		return -1;
	this.scope.setAvailableUsers(contacts);
	return 0;
};

MesiboApp.prototype.fetchContacts = async function(userToken, ts, phones, reset) {
	MesiboLog("fetchContacts called", phones);

	if(!userToken)
		return -1;

	if(!(phones && phones.length))	
		phones = [];

	if(!MESIBO_API_URL)
		return -1;

	//Request to back-end service, to fetch contact details and profile details
	var request = MESIBO_API_URL + '?op=getcontacts&token=' + userToken + '&ts=' + ts+ '&phones='+ phones;
	if(reset)
		request += '&reset=1';

	var response = await fetch(request);

	if(!response)
		return -1;

	try{
		response = await response.json(); //extract JSON from the HTTP response
		MesiboLog(response);
	}
	catch(e){
		MesiboLog("Error: fetchContacts", e);
	}

	if(response.result != "OK"){
		MesiboLog("Error: fetchContacts: getcontacts request failed");	
		return -1;
	}
	
	if(response.u){
		this.scope.setSelfProfile(response.u);
	}

	MESIBO_DOWNLOAD_URL =  response['urls']['download'];      
	MESIBO_UPLOAD_URL =  response['urls']['upload'] ;


	var contacts = response.contacts;
	if(!(contacts && contacts.length))
		return -1;

	var available_contacts =  []; 

	contacts.forEach((elem, index) => {                   

		var c = {};
		c.address = elem.phone;
		c.groupid = parseInt(elem.gid);
		c.picture = elem.photo;
		c.name = elem.name;
		c.ts = parseInt(elem.ts);
		c.status = elem.status;
		if(c.groupid!=0)
			c.members = elem.members;

		var rv = this.api.setContact(c);

		available_contacts.push(c);

	});

	MesiboLog(available_contacts);
	if(-1 == this.displayContacts(available_contacts)){
		MesiboLog("Error: fetchContacts: displayContacts failed");
		return MESIBO_RESULT_FAIL;
	}

	MesiboLog("fetchContacts successfull");
}
