module.exports = function ( n, e ) {
  "use strict";
  var t = {};

  function __webpack_require__( e ) {
    if ( t[ e ] ) {
      return t[ e ].exports
    }
    var s = t[ e ] = {
      i: e,
      l: false,
      exports: {}
    };
    n[ e ].call( s.exports, s, s.exports, __webpack_require__ );
    s.l = true;
    return s.exports
  }
  __webpack_require__.ab = __dirname + "/";

  function startup() {
    return __webpack_require__( 450 )
  }
  return startup()
}( {
  35: function ( n ) {
    n.exports = require( "@parcel/fs" )
  },
  129: function ( n ) {
    n.exports = require( "child_process" )
  },
  450: function ( n, e, t ) {
    const s = t( 622 );
    const {
      promisify: o
    } = t( 669 );
    const i = t( 35 );
    const r = t( 654 );
    const a = t( 682 );
    const c = t( 550 );
    const u = o( t( 129 ).execFile );
    const l = () => {
      return JSON.parse( process.env.jsRepl )
    };
    const f = async n => {
      await i.mkdirp( n )
    };
    const p = async n => {
      const e = s.join( n, "package.json" );
      if ( !await i.exists( e ) ) {
        await i.writeFile( e, "{}" )
      }
    };
    const d = async ( {
      guttersDir: n,
      logsDir: e,
      outRootDir: t
    } ) => {
      await f( n );
      await f( e );
      await p( t )
    };
    const g = n => {
      const e = s.join( n, "package.json" );
      const t = {
        jsdom: {
          installed: false,
          enabled: false
        },
        asyncEnd: {
          installed: false
        }
      };
      try {
        const n = require( e );
        const s = n.dependencies && n.dependencies[ c.domPlugin ];
        const o = n.dependencies && n.dependencies[ c.asyncEndPlugin ];
        if ( s ) {
          t.jsdom.installed = true
        }
        if ( o ) {
          t.asyncEnd.installed = true
        }
      } catch ( n ) {}
      return t
    };
    const v = ( n, e ) => {
      let t = {};
      return r.install( [ n ], Object.assign( t, e ) )
    };
    const m = ( n, e ) => {
      r.uninstall( [ n ], {
        cwd: e,
        save: true,
        output: true
      } ).then( function () {
        console.log( "SUCCESS!!!" )
      } ).catch( function () {
        console.log( "Unable to uninstall package" )
      } )
    };
    const w = () => ( new Date ).toISOString().split( "." ).join( "" ).split( ":" ).join( "" ).slice( 0, -1 );
    if ( process.env.DEBUG_EXT ) {
      a.log = console.log.bind( console )
    }
    const _ = n => {
      const e = a( "repl:" + n );
      return ( ...n ) => {
        e( ...n )
      }
    };
    const x = async () => {
      const {
        stdout: n
      } = await u( "node", [ "--version" ] );
      return n
    };
    n.exports = {
      getEnv: l,
      getPlugins: g,
      ensureDirPackageJsonExist: d,
      installModule: v,
      uninstallModule: m,
      getId: w,
      debugLog: _,
      getNodeVersion: x
    }
  },
  550: function ( n ) {
    n.exports = require( "./constants" )
  },
  622: function ( n ) {
    n.exports = require( "path" )
  },
  654: function ( n, e, t ) {
    const s = t( 129 ).exec;
    n.exports = {
      install: function ( n, e ) {
        if ( n.length == 0 || !n || !n.length ) {
          return Promise.reject( "No packages found" )
        }
        if ( typeof n == "string" ) n = [ n ];
        if ( !e ) e = {};
        var t = "npm install " + n.join( " " ) + " " + ( e.global ? " -g" : "" ) + ( e.save ? " --save" : " --no-save" ) + ( e.saveDev ? " --save-dev" : "" ) + ( e.legacyBundling ? " --legacy-bundling" : "" ) + ( e.noOptional ? " --no-optional" : "" ) + ( e.ignoreScripts ? " --ignore-scripts" : "" );
        return new Promise( function ( n, o ) {
          var i = s( t, {
            cwd: e.cwd ? e.cwd : "/",
            maxBuffer: e.maxBuffer ? e.maxBuffer : 200 * 1024
          }, ( e, t, s ) => {
            if ( e ) {
              o( e )
            } else {
              n( true )
            }
          } );
          if ( e.output ) {
            var r = function ( n ) {
              console.log( "npm: " + n )
            };
            i.stdout.on( "data", r );
            i.stderr.on( "data", r )
          }
        } )
      },
      uninstall: function ( n, e ) {
        if ( n.length == 0 || !n || !n.length ) {
          return Promise.reject( new Error( "No packages found" ) )
        }
        if ( typeof n == "string" ) n = [ n ];
        if ( !e ) e = {};
        var t = "npm uninstall " + n.join( " " ) + " " + ( e.global ? " -g" : "" ) + ( e.save ? " --save" : " --no-save" ) + ( e.saveDev ? " --saveDev" : "" );
        return new Promise( function ( n, o ) {
          var i = s( t, {
            cwd: e.cwd ? e.cwd : "/"
          }, ( e, t, s ) => {
            if ( e ) {
              o( e )
            } else {
              n( true )
            }
          } );
          if ( e.output ) {
            var r = function ( n ) {
              console.log( "npm: " + n )
            };
            i.stdout.on( "data", r );
            i.stderr.on( "data", r )
          }
        } )
      },
      list: function ( n ) {
        var e = false;
        if ( !n ) e = true;
        var t = "npm ls --depth=0 " + ( e ? "-g " : " " );
        return new Promise( function ( e, o ) {
          s( t, {
            cwd: n ? n : "/"
          }, ( n, t, s ) => {
            if ( s !== "" ) {
              if ( s.indexOf( "missing" ) == -1 && s.indexOf( "required" ) == -1 ) {
                return o( n )
              }
            }
            var i = [];
            i = t.split( "\n" );
            i = i.filter( function ( n ) {
              if ( n.match( /^├──.+/g ) != null ) {
                return true
              }
              if ( n.match( /^└──.+/g ) != null ) {
                return true
              }
              return undefined
            } );
            i = i.map( function ( n ) {
              if ( n.match( /^├──.+/g ) != null ) {
                return n.replace( /^├──\s/g, "" )
              }
              if ( n.match( /^└──.+/g ) != null ) {
                return n.replace( /^└──\s/g, "" )
              }
            } );
            e( i )
          } )
        } )
      }
    }
  },
  669: function ( n ) {
    n.exports = require( "util" )
  },
  682: function ( n ) {
    n.exports = require( "debug" )
  }
} );
