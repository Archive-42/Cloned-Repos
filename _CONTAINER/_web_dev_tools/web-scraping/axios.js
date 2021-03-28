//Axios is a promise-based HTTP client that runs both in the browser and NodeJS.
const axios = require( 'axios' )

axios
  .get( 'https://www.reddit.com/r/programming.json' )
  .then( ( response ) => {
    console.log( response )
  } )
  .catch( ( error ) => {
    console.error( error )
  } );
