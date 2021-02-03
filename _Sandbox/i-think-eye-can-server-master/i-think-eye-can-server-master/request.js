var request = require('request');
var uuid = require('node-uuid');
var crypto = require('crypto');
var hound = require('hound').HoundNode;

//parse arguments
var argv = require('minimist')(process.argv.slice(2));

//config file
var configFile = argv.config || 'config';
var config = require(__dirname + '/' + configFile);
var rq = uuid.v1();

var fs = require('fs');
var wav = require('wav');
var Speaker = require('speaker');

fs.readFile('SX133.wav', (err, data) => {
  if (err) throw err;
  doReq(data);
});

var houndRequest = {
    //This is where we specify the ClientMatch JSON in the RequestInfo Object
    ClientMatches: [{
        "Expression" : "[\"move\"]. [\"the\"] . (\"pawn\" | \"knight\" | \"bishop\" | \"rook\" | \"queen\" | \"king\" ) . [\"from\"] . [\"a\" | \"b\" | \"c\" | \"d\" | \"e\" | \"f\" | \"g\" | \"h\"] . [\"one\" | \"two\" | \"three\" | \"four\" | \"five\" | \"six\" | \"seven\" | \"eight\"] . [\"to\"] . (\"a\" | \"b\" | \"c\" | \"d\" | \"e\" | \"f\" | \"g\" | \"h\") . (\"one\" | \"two\" | \"three\" | \"four\" | \"five\" | \"six\" | \"seven\" | \"eight\")",
        "Result" : { "Intent" : "CHESS" },
        "SpokenResponse" : "Ok, I'm turning the lights on.",
        "SpokenResponseLong" : "Ok, I'm turning the lights on.",
        "WrittenResponse" : "Ok, I'm turning the lights on.",
        "WrittenResponseLong" : "Ok, I'm turning the lights on."
    }, {"Expression": "Rotate", "Result" : { "Intent" : "ROTATE" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}],
    DeviceID: '123',
    RequestID: rq,
    SessionID: uuid.v1(),
};

function generateAuthHeaders (clientId, clientKey, userId, requestId, request) {

    if (!clientId || !clientKey) {
        throw new Error('Must provide a Client ID and a Client Key');
    }

    // Generate a unique UserId and RequestId.
    userId      = userId || uuid.v1();

    // keep track of this requestId, you will need it for the RequestInfo Object
    requestId   = requestId || uuid.v1();

    var requestData = userId + ';' + requestId;

    // keep track of this timestamp, you will need it for the RequestInfo Object
    var timestamp   = Math.floor(Date.now() / 1000),

        unescapeBase64Url = function (key) {
            return key.replace(/-/g, '+').replace(/_/g, '/');
        },

        escapeBase64Url = function (key) {
            return key.replace(/\+/g, '-').replace(/\//g, '_');
        },

        signKey = function (clientKey, message) {
            var key = new Buffer(unescapeBase64Url(clientKey), 'base64');
            var hash = crypto.createHmac('sha256', key).update(message).digest('base64');
            return escapeBase64Url(hash);

        },

        encodedData = signKey(clientKey, requestData + timestamp),
        headers = {
            'Hound-Request-Authentication': requestData,
            'Hound-Client-Authentication': clientId + ';' + timestamp + ';' + encodedData,
            'Hound-Request-Info': JSON.stringify(houndRequest)
        };

    return headers;
};


function doReq(data) {
  var req = request({
      method: 'POST',
      url: 'https://api.houndify.com/v1/audio' ,
      headers: generateAuthHeaders(config.clientId, config.clientKey,0,rq,houndRequest),
      json: true
  }, function (err, resp, body) {
      //console.log(err);
      //console.log(resp);
      console.log(body);
      });

  req.write(data);
  req.end();
}
