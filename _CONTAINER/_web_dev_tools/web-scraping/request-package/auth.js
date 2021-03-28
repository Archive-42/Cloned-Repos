const http = require( 'http' );
const fs = require( 'fs' );
const request = require( 'request' )
const port = 3000;

const server = http.createServer( ( req, res ) => {
  res.statusCode = 200;
  res.setHeader( 'Content-Type', 'text/plain' );
  res.end( 'Hello World' );
} );

server.listen( port, () => {
  console.log( `Server running at PORT:${port}/` );
} );
//HTTP Request:
// const request = require( 'request' )
// request( 'https://semantic-ui.com/examples/login.html', function (
//   error,
//   response,
//   body
// ) {
//   console.error( 'error:', error )
//   console.log( 'body:', body )
// } )


const username = 'username',
  password = 'password',
  url = 'http://' + username + ':' + password + '@github.com';

request( {
  url
}, function ( error, response, body ) {
    console.log( "TEST!!!:", body );
    let test = body;
    fs.writeFile( 'auth.html', test, ( err ) => {

      // In case of a error throw err. 
      if ( err ) throw err;
    } )
} );

console.log( "----------------------------------------------------" )

request.get( 'https://semantic-ui.com/examples/login.html' ).auth( 'username', 'password', false );
// or
request.get( 'https://semantic-ui.com/examples/login.html', {
  'auth': {
    'user': 'username',
    'pass': 'password',
    'sendImmediately': false
  }
} );
// or
request.get( 'https://semantic-ui.com/examples/login.html' ).auth( null, null, true, 'bearerToken' );
// or
request.get( 'https://semantic-ui.com/examples/login.html', {
  'auth': {
    'bearer': 'bearerToken'
  }
} );
