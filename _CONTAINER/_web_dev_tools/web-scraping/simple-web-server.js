const http = require( 'http' );
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
const request = require( 'request' )
request( 'https://www.reddit.com/r/programming.json', function (
  error,
  response,
  body
) {
  console.error( 'error:', error )
  console.log( 'body:', body )
} )
