const fs = require( 'fs' );
const request=require('request')
const formData = {
  // Pass a simple key-value pair
  my_field: 'my_value',
  // Pass data via Buffers
  /*
  class Buffer
  Raw data is stored in instances of the Buffer class.
  A Buffer is similar to an array of integers but
  corresponds to a raw memory allocation outside the V8 heap.
  A Buffer cannot be resized.Valid string encodings: 
  'ascii' | 'utf8' | 'utf16le' | 'ucs2'( alias of 'utf16le' ) | 'base64' 
  | 'binary'( deprecated ) | 'hex'
  */
  my_buffer: Buffer.from( [ 1, 2, 3 ] ),
  // Pass data via Streams
  my_file: fs.createReadStream( __dirname + '/unicycle.jpg' ),
  // Pass multiple values /w an Array
  attachments: [
    fs.createReadStream( __dirname + '/attachment1.jpg' ),
    fs.createReadStream( __dirname + '/attachment2.jpg' )
  ],
  // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
  // Use case: for some types of streams, you'll need to provide "file"-related information manually.
  // See the `form-data` README for more information about options: https://github.com/form-data/form-data
  custom_file: {
    value: fs.createReadStream( '/dev/urandom' ),
    options: {
      filename: 'topsecret.jpg',
      contentType: 'image/jpeg'
    }
  }
};

let test =request.post( {
  url: 'http://service.com/upload',
  formData: formData
}, function optionalCallback( err, httpResponse, body ) {
  if ( err ) {
    return console.error( 'upload failed:', err );
  }
  console.log( 'Upload successful!  Server responded with:', body );
} );
// Write data in 'Output.txt' . 
fs.writeFile( 'unicycle.jpg', test, ( err ) => {

  // In case of a error throw err. 
  if ( err ) throw err;
} )
