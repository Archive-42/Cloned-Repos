const fs=require('fs')
const http = require( 'http' )

const request = require( 'request' );
request( 'http://www.google.com', function ( error, response, body ) {
  console.error( 'error:', error ); // Print the error if one occurred
  console.log( 'statusCode:', response && response.statusCode ); // Print the response status code if a response was received
  console.log( 'body:', body ); // Print the HTML for the Google homepage.
} );


console.log( "----------------------------------------------------" )

// request( 'http://google.com/doodle.png' ).pipe( fs.createWriteStream( 'doodle.png' ) )


console.log( "----------------------------------------------------" )

fs.createReadStream( 'file.json' ).pipe( request.put( 'http://mysite.com/obj.json' ) )

console.log( "----------------------------------------------------" )

request.get( 'http://google.com/img.png' ).pipe( request.put( 'https://static.toiimg.com/photo/72975551.cms' ) )


console.log( "----------------------------------------------------" )
request
  .get( 'http://google.com/img.png' )
  .on( 'response', function ( response ) {
    console.log( response.statusCode ) // 200
    console.log( response.headers[ 'content-type' ] ) // 'image/png'
  } )
  .pipe( request.put( 'https://static.toiimg.com/photo/72975551.cms' ) )



console.log( "----------------------------------------------------" )
let test =request
  .get( 'https://static.toiimg.com/photo/72975551.cms' )
  .on( 'error', function ( err ) {
    console.error( err )
  } )
  .pipe( fs.createWriteStream( 'doodle.png' ) )





// Write data in 'Output.txt' . 
fs.writeFile( 'Output.png', test, ( err ) => {

  // In case of a error throw err. 
  if ( err ) throw err;
} )
console.log( "----------------------------------------------------" )
http.createServer( function ( req, resp ) {
  if ( req.url === '/doodle.png' ) {
    if ( req.method === 'PUT' ) {
      req.pipe( request.put( 'https://static.toiimg.com/photo/72975551.cms' ) )
    } else if ( req.method === 'GET' || req.method === 'HEAD' ) {
      request.get( 'https://static.toiimg.com/photo/72975551.cms' ).pipe( resp )
    }
  }
} )


http.createServer( function ( req, resp ) {
  if ( req.url === '/doodle.png' ) {
    r.get( 'http://google.com/doodle.png' ).pipe( resp )
  }
} )
console.log( "----------------------------------------------------" )



request.post( 'http://service.com/upload', {
  form: {
    key: 'value'
  }
} )
// or
request.post( 'http://service.com/upload' ).form( {
  key: 'value'
} )
// or
request.post( {
  url: 'http://service.com/upload',
  form: {
    key: 'value'
  }
}, function ( err, httpResponse, body ) {
  /* ... */ } )
