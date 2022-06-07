// config.js



/* Refer following tutorial and API documentation to know how to create a user token
 * https://mesibo.com/documentation/tutorials/first-app/
 *
 * Note, that if you are using logging in with your phone, Mesibo will generate the token.
 * In that case, there is no need to configure token here
 * 
 */
var MESIBO_ACCESS_TOKEN = ""; 

/* App ID used to create a user token. */
var MESIBO_APP_ID = "web";

/* If you are hosting Mesibo backend on your own server, change this accordingly.
 * Refer https://github.com/mesibo/messenger-app-backend
 */
const MESIBO_API_URL = "https://app.mesibo.com/messenger/api.php";

/* Default images */
const MESIBO_DEFAULT_PROFILE_IMAGE = "images/profile/default-profile-icon.jpg";
const MESIBO_DEFAULT_GROUP_IMAGE = "images/profile/default-group-icon.jpg";

/* File url sources */
var MESIBO_DOWNLOAD_URL = "https://appimages.mesibo.com/";
var MESIBO_UPLOAD_URL = "https://s3.mesibo.com/api.php";

/************************ Messenger Config Start *****************************/

/* Toggle for using phone Login*/
var isLoginEnabled = true;

/* Toggle for synchronizing contacts*/
var isContactSync = true;

/* Toggle for synchronizing messages
*  See https://mesibo.com/documentation/tutorials/get-started/synchronization/
*/
var isMessageSync = false;

/* (Optional) You can provide a list of contacts/groups,
* for displaying a list of users to chat with and contact synchronization 

For example:
var MESIBO_LOCAL_CONTACTS =[

{	
	"address" : "18885551001",
	"groupid" : 0,
	"picture" : "images/profile/default-profile-icon.jpg",
	"name"    : "MesiboTest",
	"status"  : "Let's Chat.."
},

{	
	"groupid" : 104661,	 
	"picture" : "images/profile/default-group-icon.jpg",
	"name"    : "Mesibo Group",
	"members" : "1:123,456,789"		//Members list. Add 1: to mark as admin
},

]
**/
MESIBO_LOCAL_CONTACTS = [];

/*Optional link preview*/
const isLinkPreview = false; //Set to false if link preview not required
const LINK_PREVIEW_SERVICE = "http://api.linkpreview.net/";
const LINK_PREVIEW_KEY = ""; // Access Key
const LINK_DEFAULT_IMAGE = "images/file/default-link-icon.jpg"

/************************ Messenger Config End *****************************/

/************************ Popup Config Start *****************************/

/* Set Display Avatar and destination address for popup */
const POPUP_DISPLAY_NAME = "Mesibo"
const POPUP_DISPLAY_PICTURE = "images/profile/default-profile-icon.jpg"
/* A destination where the popup demo app will send message or make calls */
const POPUP_DESTINATION_USER = "xxx" 

/************************ Popup Config End *****************************/


/* Debug Mode Configuration */
isDebug = true ;// toggle this to turn on / off for global control
if (isDebug) var MesiboLog = console.log.bind(window.console);
else var MesiboLog = function() {}

var ErrorLog = console.log.bind(window.console);
