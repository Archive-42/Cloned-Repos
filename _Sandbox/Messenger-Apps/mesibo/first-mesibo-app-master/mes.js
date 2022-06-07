var $S;

function $Saa( a ) {
  var d = 0;
  return function () {
    return d < a.length ? {
      done: !1,
      value: a[ d++ ]
    } : {
      done: !0
    }
  }
}

function $Sa( a ) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[ Symbol.iterator ];
  return d ? d.call( a ) : {
    next: $Saa( a )
  }
}

function $Sba( a ) {
  a = [ "object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global ];
  for ( var d = 0; d < a.length; ++d ) {
    var e = a[ d ];
    if ( e && e.Math == Math ) return e
  }
  throw Error( "Cannot find global object" );
}
var $Sb = $Sba( this ),
  $Sc = "function" == typeof Object.defineProperties ? Object.defineProperty : function ( a, d, e ) {
    if ( a == Array.prototype || a == Object.prototype ) return a;
    a[ d ] = e.value;
    return a
  };

function $Sd( a, d ) {
  if ( d ) {
    var e = $Sb;
    a = a.split( "." );
    for ( var f = 0; f < a.length - 1; f++ ) {
      var h = a[ f ];
      h in e || ( e[ h ] = {} );
      e = e[ h ]
    }
    a = a[ a.length - 1 ];
    f = e[ a ];
    d = d( f );
    d != f && null != d && $Sc( e, a, {
      configurable: !0,
      writable: !0,
      value: d
    } )
  }
}
$Sd( "Promise", function ( a ) {
  function d( m ) {
    this.g = 0;
    this.N = void 0;
    this.b = [];
    var v = this.l();
    try {
      m( v.resolve, v.reject )
    } catch ( w ) {
      v.reject( w )
    }
  }

  function e() {
    this.b = null
  }

  function f( m ) {
    return m instanceof d ? m : new d( function ( v ) {
      v( m )
    } )
  }
  if ( a ) return a;
  e.prototype.g = function ( m ) {
    if ( null == this.b ) {
      this.b = [];
      var v = this;
      this.l( function () {
        v.N()
      } )
    }
    this.b.push( m )
  };
  var h = $Sb.setTimeout;
  e.prototype.l = function ( m ) {
    h( m, 0 )
  };
  e.prototype.N = function () {
    for ( ; this.b && this.b.length; ) {
      var m = this.b;
      this.b = [];
      for ( var v = 0; v < m.length; ++v ) {
        var w =
          m[ v ];
        m[ v ] = null;
        try {
          w()
        } catch ( x ) {
          this.A( x )
        }
      }
    }
    this.b = null
  };
  e.prototype.A = function ( m ) {
    this.l( function () {
      throw m;
    } )
  };
  d.prototype.l = function () {
    function m( x ) {
      return function ( D ) {
        w || ( w = !0, x.call( v, D ) )
      }
    }
    var v = this,
      w = !1;
    return {
      resolve: m( this.ab ),
      reject: m( this.A )
    }
  };
  d.prototype.ab = function ( m ) {
    if ( m === this ) this.A( new TypeError( "A Promise cannot resolve to itself" ) );
    else if ( m instanceof d ) this.cb( m );
    else {
      a: switch ( typeof m ) {
        case "object":
          var v = null != m;
          break a;
        case "function":
          v = !0;
          break a;
        default:
          v = !1
      }
      v ? this.Na( m ) : this.W( m )
    }
  };
  d.prototype.Na = function ( m ) {
    var v = void 0;
    try {
      v = m.then
    } catch ( w ) {
      this.A( w );
      return
    }
    "function" == typeof v ? this.ib( v, m ) : this.W( m )
  };
  d.prototype.A = function ( m ) {
    this.aa( 2, m )
  };
  d.prototype.W = function ( m ) {
    this.aa( 1, m )
  };
  d.prototype.aa = function ( m, v ) {
    if ( 0 != this.g ) throw Error( "Cannot settle(" + m + ", " + v + "): Promise already settled in state" + this.g );
    this.g = m;
    this.N = v;
    this.la()
  };
  d.prototype.la = function () {
    if ( null != this.b ) {
      for ( var m = 0; m < this.b.length; ++m ) l.g( this.b[ m ] );
      this.b = null
    }
  };
  var l = new e;
  d.prototype.cb =
    function ( m ) {
      var v = this.l();
      m.rb( v.resolve, v.reject )
    };
  d.prototype.ib = function ( m, v ) {
    var w = this.l();
    try {
      m.call( v, w.resolve, w.reject )
    } catch ( x ) {
      w.reject( x )
    }
  };
  d.prototype.then = function ( m, v ) {
    function w( y, M ) {
      return "function" == typeof y ? function ( k ) {
        try {
          x( y( k ) )
        } catch ( r ) {
          D( r )
        }
      } : M
    }
    var x, D, F = new d( function ( y, M ) {
      x = y;
      D = M
    } );
    this.rb( w( m, x ), w( v, D ) );
    return F
  };
  d.prototype.catch = function ( m ) {
    return this.then( void 0, m )
  };
  d.prototype.rb = function ( m, v ) {
    function w() {
      switch ( x.g ) {
        case 1:
          m( x.N );
          break;
        case 2:
          v( x.N );
          break;
        default:
          throw Error( "Unexpected state: " +
            x.g );
      }
    }
    var x = this;
    null == this.b ? l.g( w ) : this.b.push( w )
  };
  d.resolve = f;
  d.reject = function ( m ) {
    return new d( function ( v, w ) {
      w( m )
    } )
  };
  d.race = function ( m ) {
    return new d( function ( v, w ) {
      for ( var x = $Sa( m ), D = x.next(); !D.done; D = x.next() ) f( D.value ).rb( v, w )
    } )
  };
  d.all = function ( m ) {
    var v = $Sa( m ),
      w = v.next();
    return w.done ? f( [] ) : new d( function ( x, D ) {
      function F( k ) {
        return function ( r ) {
          y[ k ] = r;
          M--;
          0 == M && x( y )
        }
      }
      var y = [],
        M = 0;
      do y.push( void 0 ), M++, f( w.value ).rb( F( y.length - 1 ), D ), w = v.next(); while ( !w.done )
    } )
  };
  return d
} );

function $Sca() {
  $Sca = function () {};
  $Sb.Symbol || ( $Sb.Symbol = $Sda )
}

function $Sea( a, d ) {
  this.b = a;
  $Sc( this, "description", {
    configurable: !0,
    writable: !0,
    value: d
  } )
}
$Sea.prototype.toString = function () {
  return this.b
};
var $Sda = function () {
  function a( e ) {
    if ( this instanceof a ) throw new TypeError( "Symbol is not a constructor" );
    return new $Sea( "jscomp_symbol_" + ( e || "" ) + "_" + d++, e )
  }
  var d = 0;
  return a
}();

function $Se() {
  $Sca();
  var a = $Sb.Symbol.iterator;
  a || ( a = $Sb.Symbol.iterator = $Sb.Symbol( "Symbol.iterator" ) );
  "function" != typeof Array.prototype[ a ] && $Sc( Array.prototype, a, {
    configurable: !0,
    writable: !0,
    value: function () {
      return $Sfa( $Saa( this ) )
    }
  } );
  $Se = function () {}
}

function $Sfa( a ) {
  $Se();
  a = {
    next: a
  };
  a[ $Sb.Symbol.iterator ] = function () {
    return this
  };
  return a
}

function $Sf() {
  this.W = !1;
  this.l = null;
  this.N = void 0;
  this.b = 1;
  this.la = this.g = 0;
  this.A = null
}

function $Sg( a ) {
  if ( a.W ) throw new TypeError( "Generator is already running" );
  a.W = !0
}
$Sf.prototype.aa = function ( a ) {
  this.N = a
};

function $Sh( a, d ) {
  a.A = {
    Ld: d,
    Xd: !0
  };
  a.b = a.g || a.la
}
$Sf.prototype.return = function ( a ) {
  this.A = {
    return: a
  };
  this.b = this.la
};

function $Si( a, d, e ) {
  a.b = e;
  return {
    value: d
  }
}

function $Sj( a, d ) {
  a.b = d;
  a.g = 0
}

function $Sk( a ) {
  a.g = 0;
  a.A = null
}

function $Sga( a ) {
  this.b = new $Sf;
  this.g = a
}

function $Sha( a, d ) {
  $Sg( a.b );
  var e = a.b.l;
  if ( e ) return $Sl( a, "return" in e ? e[ "return" ] : function ( f ) {
    return {
      value: f,
      done: !0
    }
  }, d, a.b.return );
  a.b.return( d );
  return $Sm( a )
}

function $Sl( a, d, e, f ) {
  try {
    var h = d.call( a.b.l, e );
    if ( !( h instanceof Object ) ) throw new TypeError( "Iterator result " + h + " is not an object" );
    if ( !h.done ) return a.b.W = !1, h;
    var l = h.value
  } catch ( m ) {
    return a.b.l = null, $Sh( a.b, m ), $Sm( a )
  }
  a.b.l = null;
  f.call( a.b, l );
  return $Sm( a )
}

function $Sm( a ) {
  for ( ; a.b.b; ) try {
    var d = a.g( a.b );
    if ( d ) return a.b.W = !1, {
      value: d.value,
      done: !1
    }
  } catch ( e ) {
    a.b.N = void 0, $Sh( a.b, e )
  }
  a.b.W = !1;
  if ( a.b.A ) {
    d = a.b.A;
    a.b.A = null;
    if ( d.Xd ) throw d.Ld;
    return {
      value: d.return,
      done: !0
    }
  }
  return {
    value: void 0,
    done: !0
  }
}

function $Sia( a ) {
  this.next = function ( d ) {
    $Sg( a.b );
    a.b.l ? d = $Sl( a, a.b.l.next, d, a.b.aa ) : ( a.b.aa( d ), d = $Sm( a ) );
    return d
  };
  this.throw = function ( d ) {
    $Sg( a.b );
    a.b.l ? d = $Sl( a, a.b.l[ "throw" ], d, a.b.aa ) : ( $Sh( a.b, d ), d = $Sm( a ) );
    return d
  };
  this.return = function ( d ) {
    return $Sha( a, d )
  };
  $Se();
  this[ Symbol.iterator ] = function () {
    return this
  }
}

function $Sja( a ) {
  function d( f ) {
    return a.next( f )
  }

  function e( f ) {
    return a.throw( f )
  }
  return new Promise( function ( f, h ) {
    function l( m ) {
      m.done ? f( m.value ) : Promise.resolve( m.value ).then( d, e ).then( l, h )
    }
    l( a.next() )
  } )
}

function $Sn( a ) {
  return $Sja( new $Sia( new $Sga( a ) ) )
}
$Sd( "Array.prototype.find", function ( a ) {
  return a ? a : function ( d, e ) {
    a: {
      var f = this;f instanceof String && ( f = String( f ) );
      for ( var h = f.length, l = 0; l < h; l++ ) {
        var m = f[ l ];
        if ( d.call( e, m, l, f ) ) {
          d = m;
          break a
        }
      }
      d = void 0
    }
    return d
  }
} );
$Sd( "String.prototype.endsWith", function ( a ) {
  return a ? a : function ( d, e ) {
    if ( null == this ) throw new TypeError( "The 'this' value for String.prototype.endsWith must not be null or undefined" );
    if ( d instanceof RegExp ) throw new TypeError( "First argument to String.prototype.endsWith must not be a regular expression" );
    void 0 === e && ( e = this.length );
    e = Math.max( 0, Math.min( e | 0, this.length ) );
    for ( var f = d.length; 0 < f && 0 < e; )
      if ( this[ --e ] != d[ --f ] ) return !1;
    return 0 >= f
  }
} );
$Sd( "Array.prototype.copyWithin", function ( a ) {
  function d( e ) {
    e = Number( e );
    return Infinity === e || -Infinity === e ? e : e | 0
  }
  return a ? a : function ( e, f, h ) {
    var l = this.length;
    e = d( e );
    f = d( f );
    h = void 0 === h ? l : d( h );
    e = 0 > e ? Math.max( l + e, 0 ) : Math.min( e, l );
    f = 0 > f ? Math.max( l + f, 0 ) : Math.min( f, l );
    h = 0 > h ? Math.max( l + h, 0 ) : Math.min( h, l );
    if ( e < f )
      for ( ; f < h; ) f in this ? this[ e++ ] = this[ f++ ] : ( delete this[ e++ ], f++ );
    else
      for ( h = Math.min( h, l + f - e ), e += h - f; h > f; ) --h in this ? this[ --e ] = this[ h ] : delete this[ --e ];
    return this
  }
} );

function $So( a, d, e ) {
  return a.hasOwnProperty( d ) ? a[ d ] : e
}

function $Sp() {}

function $Ska() {
  var a = adapter;
  if ( !$Sq ) {
    $Sla = $Sq = !0;
    $Sr = a;
    $Sma = function ( f, h ) {
      try {
        f.srcObject = h
      } catch ( l ) {
        try {
          f.src = URL.createObjectURL( h )
        } catch ( m ) {
          console.log( "attaching player failed" )
        }
      }
    };
    $Ss = !1;
    $St = function () {};
    if ( "safari" === $Sr.browserDetails.browser && 605 <= $Sr.browserDetails.version )
      if ( RTCRtpSender && RTCRtpSender.getCapabilities && RTCRtpSender.getCapabilities( "video" ) && RTCRtpSender.getCapabilities( "video" ).codecs && RTCRtpSender.getCapabilities( "video" ).codecs.length ) {
        a = $Sa( RTCRtpSender.getCapabilities( "video" ).codecs );
        for ( var d = a.next(); !d.done; d = a.next() )
          if ( ( d = d.value ) && d.mimeType && "video/vp8" === d.mimeType.toLowerCase() ) {
            $Ss = !0;
            break
          } $Ss || $St()
      } else {
        var e = new RTCPeerConnection( {} );
        e.createOffer( {
          offerToReceiveVideo: !0
        } ).then( function ( f ) {
          ( $Ss = -1 !== f.sdp.indexOf( "VP8" ) ) || $St();
          e.close();
          e = null
        } )
      } $Su = !1;
    if ( "firefox" === $Sr.browserDetails.browser && 59 <= $Sr.browserDetails.version ) $Su = !0;
    else if ( "chrome" === $Sr.browserDetails.browser && 72 <= $Sr.browserDetails.version ) $Su = !0;
    else if ( window.RTCRtpTransceiver && "currentDirection" in
      RTCRtpTransceiver.prototype ) {
      a = new RTCPeerConnection;
      try {
        a.addTransceiver( "audio" ), $Su = !0
      } catch ( f ) {}
      a.close()
    } else $Su = !1
  }
}

function $Sna( a ) {
  a = a || {};
  a.Xc = "function" == typeof a.Xc ? a.Xc : $Sp;
  a.K = "function" == typeof a.K ? a.K : $Sp;
  a.L = "function" == typeof a.L ? a.L : $Sp;
  a.dc = "function" == typeof a.dc ? a.dc : $Sp;
  a.Hb = "function" == typeof a.Hb ? a.Hb : $Sp;
  a.Gb = "function" == typeof a.Gb ? a.Gb : $Sp;
  a.eb = "function" == typeof a.eb ? a.eb : $Sp;
  a.Ba = "function" == typeof a.Ba ? a.Ba : $Sp;
  a.Yc = "function" == typeof a.Yc ? a.Yc : $Sp;
  a.Zc = "function" == typeof a.Zc ? a.Zc : $Sp;
  a.Fb = "function" == typeof a.Fb ? a.Fb : $Sp;
  a.Ra = "function" == typeof a.Ra ? a.Ra : $Sp;
  a.Pa = "function" == typeof a.Pa ?
    a.Pa : $Sp;
  a.Sb = "function" == typeof a.Sb ? a.Sb : $Sp;
  a.Qa = function () {
    a.K( this.e )
  }
}

function $Sv( a, d ) {
  function e( k ) {
    var r = {
      high: 9E5,
      Oa: 5E5,
      low: 2E5
    };
    void 0 !== k && null !== k && ( k.high && ( r.high = k.high ), k.Oa && ( r.Oa = k.Oa ), k.low && ( r.low = k.low ) );
    return r
  }

  function f( k, r, n ) {
    function q( z ) {
      z = z.target.label;
      if ( "open" === ( t.O[ z ] ? t.O[ z ].readyState : "null" ) && t.O[ z ].pending && 0 < t.O[ z ].pending.length ) {
        for ( var G = $Sa( t.O[ z ].pending ), A = G.next(); !A.done; A = G.next() ) t.O[ z ].send( A.value );
        t.O[ z ].pending = []
      }
    }
    var t = this.T;
    t.O[ k ] = r ? r : t.c.createDataChannel( k, {
      ordered: !0
    } );
    t.O[ k ].onmessage = function () {};
    t.O[ k ].onopen =
      q;
    t.O[ k ].onclose = q;
    t.O[ k ].onerror = function () {};
    t.O[ k ].pending = [];
    n && t.O[ k ].pending.push( n )
  }

  function h( k ) {
    for ( var r = k.split( "\r\n" ), n = !1, q = [ -1 ], t = [ -1 ], z = null, G = null, A = null, I = null, E = -1, C = 0; C < r.length; C++ ) {
      var B = r[ C ].match( /m=(\w+) */ );
      if ( B )
        if ( B = B[ 1 ], "video" === B )
          if ( 0 > q[ 0 ] ) n = !0;
          else {
            E = C;
            break
          }
      else {
        if ( -1 < q[ 0 ] ) {
          E = C;
          break
        }
      } else if ( n )
        if ( B = r[ C ].match( /a=ssrc-group:FID (\d+) (\d+)/ ) ) q[ 0 ] = B[ 1 ], t[ 0 ] = B[ 2 ], r.splice( C, 1 ), C--;
        else {
          if ( q[ 0 ] ) {
            ( B = r[ C ].match( "a=ssrc:" + q[ 0 ] + " cname:(.+)" ) ) && ( z = B[ 1 ] );
            ( B = r[ C ].match( "a=ssrc:" +
              q[ 0 ] + " msid:(.+)" ) ) && ( G = B[ 1 ] );
            ( B = r[ C ].match( "a=ssrc:" + q[ 0 ] + " mslabel:(.+)" ) ) && ( A = B[ 1 ] );
            ( B = r[ C ].match( "a=ssrc:" + q[ 0 ] + " label:(.+)" ) ) && ( I = B[ 1 ] );
            if ( 0 === r[ C ].indexOf( "a=ssrc:" + t[ 0 ] ) ) {
              r.splice( C, 1 );
              C--;
              continue
            }
            if ( 0 === r[ C ].indexOf( "a=ssrc:" + q[ 0 ] ) ) {
              r.splice( C, 1 );
              C--;
              continue
            }
          }
          0 == r[ C ].length && ( r.splice( C, 1 ), C-- )
        }
    }
    if ( 0 > q[ 0 ] )
      for ( E = -1, n = !1, C = 0; C < r.length; C++ )
        if ( B = r[ C ].match( /m=(\w+) */ ) )
          if ( B = B[ 1 ], "video" === B )
            if ( 0 > q[ 0 ] ) n = !0;
            else {
              E = C;
              break
            }
    else {
      if ( -1 < q[ 0 ] ) {
        E = C;
        break
      }
    } else if ( n ) {
      if ( 0 > q[ 0 ] ) {
        if ( B = r[ C ].match( /a=ssrc:(\d+)/ ) ) {
          q[ 0 ] =
            B[ 1 ];
          r.splice( C, 1 );
          C--;
          continue
        }
      } else {
        ( B = r[ C ].match( "a=ssrc:" + q[ 0 ] + " cname:(.+)" ) ) && ( z = B[ 1 ] );
        ( B = r[ C ].match( "a=ssrc:" + q[ 0 ] + " msid:(.+)" ) ) && ( G = B[ 1 ] );
        ( B = r[ C ].match( "a=ssrc:" + q[ 0 ] + " mslabel:(.+)" ) ) && ( A = B[ 1 ] );
        ( B = r[ C ].match( "a=ssrc:" + q[ 0 ] + " label:(.+)" ) ) && ( I = B[ 1 ] );
        if ( 0 === r[ C ].indexOf( "a=ssrc:" + t[ 0 ] ) ) {
          r.splice( C, 1 );
          C--;
          continue
        }
        if ( 0 === r[ C ].indexOf( "a=ssrc:" + q[ 0 ] ) ) {
          r.splice( C, 1 );
          C--;
          continue
        }
      }
      0 === r[ C ].length && ( r.splice( C, 1 ), C-- )
    }
    if ( 0 > q[ 0 ] ) return k;
    0 > E && ( E = r.length );
    q[ 1 ] = Math.floor( 4294967295 * Math.random() );
    q[ 2 ] = Math.floor( 4294967295 * Math.random() );
    t[ 1 ] = Math.floor( 4294967295 * Math.random() );
    t[ 2 ] = Math.floor( 4294967295 * Math.random() );
    for ( C = 0; C < q.length; C++ ) z && ( r.splice( E, 0, "a=ssrc:" + q[ C ] + " cname:" + z ), E++ ), G && ( r.splice( E, 0, "a=ssrc:" + q[ C ] + " msid:" + G ), E++ ), A && ( r.splice( E, 0, "a=ssrc:" + q[ C ] + " mslabel:" + A ), E++ ), I && ( r.splice( E, 0, "a=ssrc:" + q[ C ] + " label:" + I ), E++ ), z && ( r.splice( E, 0, "a=ssrc:" + t[ C ] + " cname:" + z ), E++ ), G && ( r.splice( E, 0, "a=ssrc:" + t[ C ] + " msid:" + G ), E++ ), A && ( r.splice( E, 0, "a=ssrc:" + t[ C ] + " mslabel:" + A ), E++ ),
      I && ( r.splice( E, 0, "a=ssrc:" + t[ C ] + " label:" + I ), E++ );
    r.splice( E, 0, "a=ssrc-group:FID " + q[ 2 ] + " " + t[ 2 ] );
    r.splice( E, 0, "a=ssrc-group:FID " + q[ 1 ] + " " + t[ 1 ] );
    r.splice( E, 0, "a=ssrc-group:FID " + q[ 0 ] + " " + t[ 0 ] );
    r.splice( E, 0, "a=ssrc-group:SIM " + q[ 0 ] + " " + q[ 1 ] + " " + q[ 2 ] );
    k = r.join( "\r\n" );
    k.endsWith( "\r\n" ) || ( k += "\r\n" );
    return k
  }

  function l( k ) {
    return k ? !1 === k.audio ? !1 : void 0 === k.audio.send || null === k.audio.send ? !0 : !0 === k.audio.send : !0
  }

  function m( k ) {
    return k ? !1 === k.audio ? !1 : void 0 === k.audio.F || null === k.audio.F ? !0 : !0 === k.audio.F :
      !0
  }

  function v( k ) {
    return k ? !1 === k.video ? !1 : void 0 === k.video.send || null === k.video.send ? !0 : !0 === k.video.send : !0
  }

  function w( k ) {
    return k ? !1 === k.video ? !1 : void 0 === k.video.F || null === k.video.F ? !0 : !0 === k.video.F : !0
  }
  $Sna( d );
  if ( !$Sq ) return {};
  if ( !window.RTCPeerConnection ) return d.K( this, "mesibo calls are not supported by this browser" ), {};
  var x = a.iceServers || [ {
      urls: "stun:stun.l.google.com:19302"
    } ],
    D = a.iceTransportPolicy,
    F = a.bundlePolicy,
    y = !0 === a.Oe;
  this.ub = !0;
  this.i = d;
  this.options = a;
  this.Ha = null;
  void 0 !== a.ub &&
    null !== a.ub && ( this.ub = !0 === a.ub );
  this.T = {
    kb: !1,
    f: null,
    Va: !1,
    ha: null,
    za: null,
    Pc: null,
    c: null,
    O: {},
    Jd: null,
    nb: !0,
    zb: !1,
    volume: {
      value: null,
      G: null
    },
    bitrate: {
      value: null,
      Dd: null,
      Cd: null,
      Ce: null,
      Be: null,
      G: null
    }
  };
  this.send = function () {
    this.af()
  };
  this.dtmf = function () {
    this.$e()
  };
  this.pe = function ( k ) {
    this.setRemoteDescription( k )
  };
  this.R = function () {
    this.Ac()
  };
  var M = this;
  this.Pa = function ( k ) {
    var r = this.T;
    r.c && r.kc ? k && !0 !== k.completed ? r.c.addIceCandidate( k ) : r.c.addIceCandidate( null ) : ( r.V || ( r.V = [] ), r.V.push( k ) )
  };
  this.ka =
    function () {
      return this.fb
    };
  this.Vd = function () {
    if ( this.T.c.getSenders() && this.T.c.getSenders().length )
      for ( var k = $Sa( this.T.c.getSenders() ), r = k.next(); !r.done; r = k.next() )
        if ( ( r = r.value ) && r.track && "video" === r.track.kind ) return r;
    return null
  };
  this.createOffer = function ( k, r ) {
    this.fb = r;
    this.ed( k, null )
  };
  this.createAnswer = function ( k, r, n ) {
    this.fb = n;
    this.ed( k, r )
  };
  this.close = function () {
    this.Ac()
  };
  this.qa = function ( k, r, n ) {
    if ( void 0 != n && null != n ) {
      var q = {};
      q.source = r.video.source;
      q.B = r.video.B;
      q.video = r.video.send;
      q.audio = r.audio.send;
      this.i.Hb( this, q )
    }
    var t = this.T,
      z = this;
    q = !1;
    if ( t.f && r.update && !t.Va ) {
      if ( ( !r.update && l( r ) || r.update && ( r.audio.add || r.audio.replace ) ) && n.getAudioTracks() && n.getAudioTracks().length )
        if ( t.f.addTrack( n.getAudioTracks()[ 0 ] ), $Su ) {
          var G = null,
            A = t.c.getTransceivers();
          if ( A && 0 < A.length ) {
            var I = $Sa( A );
            for ( A = I.next(); !A.done; A = I.next() )
              if ( A = A.value, A.sender && A.sender.track && "audio" === A.sender.track.kind || A.receiver && A.receiver.track && "audio" === A.receiver.track.kind ) {
                G = A;
                break
              }
          }
          G && G.sender ? G.sender.replaceTrack( n.getAudioTracks()[ 0 ] ) :
            t.c.addTrack( n.getAudioTracks()[ 0 ], n )
        } else t.c.addTrack( n.getAudioTracks()[ 0 ], n );
      if ( ( !r.update && v( r ) || r.update && ( r.video.add || r.video.replace ) ) && n.getVideoTracks() && n.getVideoTracks().length ) {
        if ( this.Ha ) {
          try {
            t.f.removeTrack( this.Ha ), this.Ha.stop()
          } catch ( B ) {}
          this.Ha = null
        }
        t.f.addTrack( n.getVideoTracks()[ 0 ] );
        if ( $Su ) {
          G = null;
          if ( ( A = t.c.getTransceivers() ) && 0 < A.length )
            for ( I = $Sa( A ), A = I.next(); !A.done; A = I.next() )
              if ( A = A.value, A.sender && A.sender.track && "video" === A.sender.track.kind || A.receiver && A.receiver.track &&
                "video" === A.receiver.track.kind ) {
                G = A;
                break
              } G && G.sender ? G.sender.replaceTrack( n.getVideoTracks()[ 0 ] ) : t.c.addTrack( n.getVideoTracks()[ 0 ], n )
        } else t.c.addTrack( n.getVideoTracks()[ 0 ], n )
      }
    } else t.f = n, q = !0;
    if ( !t.c ) {
      G = {
        iceServers: x,
        iceTransportPolicy: D,
        bundlePolicy: F
      };
      "chrome" === $Sr.browserDetails.browser && ( G.sdpSemantics = 72 > $Sr.browserDetails.version ? "plan-b" : "unified-plan" );
      A = {
        optional: [ {
          DtlsSrtpKeyAgreement: !0
        } ]
      };
      y && A.optional.push( {
        googIPv6: !0
      } );
      if ( d.nc && "object" === typeof d.nc )
        for ( var E in d.nc ) A.optional.push( d.nc[ E ] );
      "edge" === $Sr.browserDetails.browser && ( G.bundlePolicy = "max-bundle" );
      t.c = new RTCPeerConnection( G, A );
      t.c.getStats && ( t.volume = {}, t.bitrate.value = "0 kbits/sec" );
      t.c.oniceconnectionstatechange = function () {
        t.c && z.i.Gb( z, t.c.iceConnectionState )
      };
      t.c.onicecandidate = function ( B ) {
        !B.candidate || "edge" === $Sr.browserDetails.browser && 0 < B.candidate.candidate.indexOf( "endOfCandidates" ) ? ( t.zb = !0, !0 === t.nb ? z.kd( null ) : z.me() ) : ( B = {
            candidate: B.candidate.candidate,
            sdpMid: B.candidate.sdpMid,
            sdpMLineIndex: B.candidate.sdpMLineIndex
          },
          !0 === t.nb && z.kd( B ) )
      };
      t.c.ontrack = function ( B ) {
        B.streams && ( t.ha = B.streams[ 0 ], t.ha.getTracks(), z.i.Ba( z, t.ha, !0, !0 ), B.track.onended || ( B.track.onended = function ( K ) {
          t.ha && ( t.ha.removeTrack( K.target ), z.i.Ba( z, t.ha, !1, !1 ) )
        }, B.track.onmute = function () {
          t.ha && z.i.Ba( z, t.ha, !1, !1 )
        }, B.track.onunmute = function () {
          try {
            z.i.Ba( z, t.ha, !1, !0 )
          } catch ( K ) {}
        } ) )
      }
    }
    if ( q && n ) {
      var C = !0 === r.te;
      n.getTracks().forEach( function ( B ) {
        if ( C )
          if ( "audio" === B.kind ) t.c.addTrack( B, n );
          else {
            var K = e( r.sd );
            t.c.addTransceiver( B, {
              direction: "sendrecv",
              streams: [ n ],
              sendEncodings: [ {
                rid: "f",
                active: !0,
                maxBitrate: K.high
              }, {
                rid: "h",
                active: !0,
                maxBitrate: K.Oa,
                scaleResolutionDownBy: 2
              }, {
                rid: "q",
                active: !0,
                maxBitrate: K.low,
                scaleResolutionDownBy: 4
              } ]
            } )
          }
        else t.c.addTrack( B, n )
      } )
    }( "edge" === $Sr.browserDetails.browser || void 0 === r || null === r ? 0 : !0 === r.data ) && !t.O[ $Sv.b ] && ( f( $Sv.b, !1 ), t.c.ondatachannel = function ( B ) {
      f( B.channel.label, B.channel )
    } );
    if ( t.f && ( z.i.eb( z, t.f, !0 ), E = t.f.getTracks() ) )
      for ( E = $Sa( E ), q = E.next(); !q.done; q = E.next() )
        if ( ( q = q.value ) && "video" === q.kind ) {
          q.onended =
            function () {
              z.i.eb( z, t.f, !1 )
            };
          break
        } k ? t.c.setRemoteDescription( k ).then( function () {
      t.kc = k.sdp;
      if ( t.V && 0 < t.V.length ) {
        for ( var B = 0; B < t.V.length; B++ ) {
          var K = t.V[ B ];
          K && !0 !== K.completed ? t.c.addIceCandidate( K ) : t.c.addIceCandidate( null )
        }
        t.V = []
      }
      z.Gd( r )
    }, function () {
      z.i.Qa()
    } ) : this.Hd( r )
  };
  this.Ab = function ( k ) {
    return 2 == k ? !0 : !1
  };
  this.Bc = function ( k ) {
    if ( !k || !v( k ) ) return !1;
    var r = this.Ab( k.video.source );
    k.video.B || ( k.video.source && !r ? k.video.B = k.video.source : k.video.B = 2 );
    var n = k.video.B;
    if ( 8 === n ) {
      var q = 120;
      n = 160
    } else 1 ==
      n ? ( q = 240, n = 320 ) : 9 == n ? ( q = 180, n = 320 ) : 3 == n ? ( q = 720, n = 1280 ) : 4 == n ? ( q = 1080, n = 1920 ) : 5 == n ? ( q = 2160, n = 3840 ) : 2 == n ? ( q = 480, n = 640 ) : 10 == n ? ( q = 360, n = 640 ) : ( q = 480, n = 640, k.video.B = 2 );
    r && 1920 > n && ( q = 1080, n = 1920 );
    k.video.width && 0 < k.video.width && ( r = n / q, n = k.video.width, k.video.height || ( q = n / r ) );
    k.video.height && 0 < k.video.height && ( q = k.video.height );
    r = {
      height: {
        ideal: q
      },
      width: {
        ideal: n
      }
    };
    q = this.Ab( k.video.source ) ? 10 : 0;
    k.video.rate && 0 < k.video.rate && ( q = k.video.rate );
    q && ( n = {}, n.ideal = q, k.video.Oc && 0 < k.video.Oc && ( q = k.video.Oc ), n.max =
      q, r.frameRate = n );
    return r
  };
  this.ed = function ( k, r ) {
    var n = this;
    k = "object" === typeof k && k ? k : {
      audio: {
        send: !0,
        F: !0
      },
      video: {
        send: !0,
        F: !0
      }
    };
    k.video = "object" === typeof k.video && k.video ? k.video : {
      send: !0,
      F: !0
    };
    k.audio = "object" === typeof k.audio && k.audio ? k.audio : {
      send: !0,
      F: !0
    };
    var q = this.T;
    if ( q.c ) {
      k.update = !0;
      if ( !n.i.stream ) {
        if ( k.audio.add ) {
          if ( k.audio.o = !1, k.audio.replace = !1, k.audio.remove = !1, k.audio.send = !0, q.f && q.f.getAudioTracks() && q.f.getAudioTracks().length ) {
            n.i.K( n, "Can't add audio stream, there already is one" );
            return
          }
        } else k.audio.remove ? ( k.audio.o = !1, k.audio.replace = !1, k.audio.add = !1, k.audio.send = !1 ) : k.audio.replace && ( k.audio.o = !1, k.audio.add = !1, k.audio.remove = !1, k.audio.send = !0 );
        q.f ? q.f.getAudioTracks() && 0 !== q.f.getAudioTracks().length ? !l( k ) || k.audio.remove || k.audio.replace || ( k.audio.o = !0 ) : ( k.audio.replace && ( k.audio.o = !1, k.audio.replace = !1, k.audio.add = !0, k.audio.send = !0 ), l( k ) && ( k.audio.o = !1, k.audio.add = !0 ) ) : ( k.audio.replace && ( k.audio.o = !1, k.audio.replace = !1, k.audio.add = !0, k.audio.send = !0 ), l( k ) && ( k.audio.o = !1, k.audio.add = !0 ) );
        if ( k.video.add ) {
          if ( k.video.o = !1, k.video.replace = !1, k.video.remove = !1, k.video.send = !0, q.f && q.f.getVideoTracks() && q.f.getVideoTracks().length ) {
            n.i.K( n, "Can't add video stream, there already is one" );
            return
          }
        } else k.video.remove ? ( k.video.o = !1, k.video.replace = !1, k.video.add = !1, k.video.send = !1 ) : k.video.replace && ( k.video.o = !1, k.video.add = !1, k.video.remove = !1, k.video.send = !0 );
        q.f ? q.f.getVideoTracks() && 0 !== q.f.getVideoTracks().length ? !v( k ) || k.video.remove || k.video.replace || ( k.video.o = !0 ) :
          ( k.video.replace && ( k.video.o = !1, k.video.replace = !1, k.video.add = !0, k.video.send = !0 ), v( k ) && ( k.video.o = !1, k.video.add = !0 ) ) : ( k.video.replace && ( k.video.o = !1, k.video.replace = !1, k.video.add = !0, k.video.send = !0 ), v( k ) && ( k.video.o = !1, k.video.add = !0 ) );
        k.Fe && ( k.data = !0 )
      }
      if ( l( k ) && k.audio.o && v( k ) && k.video.o ) {
        n.i.L( n, !1 );
        n.qa( r, k, q.f );
        return
      }
    } else k.update = !1, k.audio.o = !1, k.video.o = !1;
    if ( k.update && !q.Va ) {
      if ( k.audio.remove || k.audio.replace ) {
        if ( q.f && q.f.getAudioTracks() && q.f.getAudioTracks().length ) {
          var t = q.f.getAudioTracks()[ 0 ];
          q.f.removeTrack( t );
          try {
            t.stop()
          } catch ( H ) {}
        }
        if ( q.c.getSenders() && q.c.getSenders().length && ( t = !0, k.audio.replace && $Su && ( t = !1 ), t ) ) {
          t = $Sa( q.c.getSenders() );
          for ( var z = t.next(); !z.done; z = t.next() )( z = z.value ) && z.track && "audio" === z.track.kind && q.c.removeTrack( z )
        }
      }
      if ( k.video.remove || k.video.replace ) {
        if ( q.f && q.f.getVideoTracks() && q.f.getVideoTracks().length )
          if ( t = q.f.getVideoTracks()[ 0 ], !k.video.remove && $Sla ) this.Ha = t;
          else {
            q.f.removeTrack( t );
            try {
              t.stop()
            } catch ( H ) {}
          } if ( q.c.getSenders() && q.c.getSenders().length &&
          ( !k.video.replace || !$Su ) )
          for ( t = $Sa( q.c.getSenders() ), z = t.next(); !z.done; z = t.next() )( z = z.value ) && z.track && "video" === z.track.kind && q.c.removeTrack( z )
      }
    }
    if ( k.stream ) {
      var G = k.stream;
      if ( k.update && q.f && q.f !== d.stream && !q.Va ) {
        try {
          for ( var A = q.f.getTracks(), I = $Sa( A ), E = I.next(); !E.done; E = I.next() ) {
            var C = E.value;
            C && C.stop()
          }
        } catch ( H ) {}
        q.f = null
      }
      q.Va = !0;
      n.i.L( n, !1 );
      n.qa( r, k, G )
    } else if ( l( k ) || v( k ) )
      if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
        A = {
          mandatory: {},
          optional: []
        };
        k.update || this.Ab( k.video.source ) ||
          n.i.L( n, !0 );
        var B = l( k );
        B && k && "object" === typeof k.audio && ( B = k.audio );
        var K = v( k );
        if ( K && k ) {
          q = !0 === k.te;
          !0 !== k.jb && !q || r || k.video.source || ( k.video.source = 1 );
          if ( this.Ab( k.video.source ) ) {
            q = function ( H, J, N ) {
              navigator.mediaDevices.getUserMedia( H ).then( function ( L ) {
                N ? navigator.mediaDevices.getUserMedia( {
                  audio: !0,
                  video: !1
                } ).then( function ( O ) {
                  L.addTrack( O.getAudioTracks()[ 0 ] );
                  J( null, L )
                } ) : J( null, L )
              } ).catch( function ( L ) {
                this.Ha = null;
                n.i.L( n, !1 );
                J( L )
              } )
            };
            var Q = function ( H, J ) {
              n.i.L( n, !1 );
              H ? n.i.K( n, H ) : n.qa( r, k, J )
            };
            if ( navigator.mediaDevices &&
              navigator.mediaDevices.getDisplayMedia ) {
              A.video = this.Bc( k );
              A.audio = k.He;
              navigator.mediaDevices.getDisplayMedia( A ).then( function ( H ) {
                n.i.L( n, !1 );
                l( k ) && !k.audio.o ? navigator.mediaDevices.getUserMedia( {
                  audio: !0,
                  video: !1
                } ).then( function ( J ) {
                  H.addTrack( J.getAudioTracks()[ 0 ] );
                  n.qa( r, k, H )
                } ) : n.qa( r, k, H )
              }, function ( H ) {
                n.i.L( n, !1 );
                d.K( n, H )
              } );
              return
            }
            "chrome" === $Sr.browserDetails.browser ? ( A = $Sr.browserDetails.version, I = 33, window.navigator.userAgent.match( "Linux" ) && ( I = 35 ), 26 <= A && A <= I && ( A = {
              video: {
                mandatory: {
                  Ke: !0,
                  maxWidth: window.screen.width,
                  maxHeight: window.screen.height,
                  Se: k.he,
                  maxFrameRate: k.he,
                  chromeMediaSource: "screen"
                }
              },
              audio: l( k ) && !k.audio.o
            }, q( A, Q ) ) ) : "firefox" === $Sr.browserDetails.browser && ( 33 <= $Sr.browserDetails.version ? ( A = {
                video: {
                  Ue: k.video.source,
                  mediaSource: k.video.source
                },
                audio: l( k ) && !k.audio.o
              }, q( A, function ( H, J ) {
                Q( H, J );
                if ( !H ) var N = J.currentTime,
                  L = window.setInterval( function () {
                    J || window.clearInterval( L );
                    if ( J.currentTime == N && ( window.clearInterval( L ), J.onended ) ) J.onended();
                    N = J.currentTime
                  }, 500 )
              } ) ) :
              ( q = Error( "NavigatorUserMediaError" ), q.name = "Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)", n.i.L( n, !1 ), d.K( n, q ) ) );
            return
          }
          K = this.Bc( k )
        }( !k || !K && B || 2 !== k.video.source ) && navigator.mediaDevices.enumerateDevices().then( function ( H ) {
          var J = H.some( function ( P ) {
            return "audioinput" === P.kind
          } );
          H = ( 2 == k.video.source ? !0 : !1 ) || H.some( function ( P ) {
            return "videoinput" === P.kind
          } );
          var N = l( k ),
            L = v( k ),
            O = k && !1 !== k.audio && !1 !== k.audio.send && void 0 !== k.Ec && null !== k.Ec ?
            !0 === k.Ec : !1,
            R = k && !1 !== k.video && !1 !== k.video.send && void 0 !== k.Fc && null !== k.Fc ? !0 === k.Fc : !1;
          if ( N || L || O || R )
            if ( N = N ? J : !1, L = L ? H : !1, N || L ) {
              if ( !N && O ) return n.i.L( n, !1 ), d.K( n, "Audio capture is required, but no capture device found" ), !1;
              if ( !L && R ) return n.i.L( n, !1 ), d.K( n, "Video capture is required, but no capture device found" ), !1
            } else return n.i.L( n, !1 ), d.K( n, "No capture device found" ), !1;
          J = {
            audio: J && !k.audio.o ? B : !1,
            video: H && !k.video.o ? K : !1
          };
          J.audio || J.video ? ( H = {}, n.i.de( n, H ), J.video && H.hasOwnProperty( "video" ) &&
            ( ( O = H.video ) && O.hasOwnProperty( "facingMode" ) && ( J.video.facingMode = O.facingMode ), O && O.hasOwnProperty( "deviceId" ) && ( J.video.deviceId = O.deviceId ) ), J.audio && H.hasOwnProperty( "audio" ) && ( H = H.audio ) && H.hasOwnProperty( "deviceId" ) && ( J.audio.deviceId = H.deviceId ), navigator.mediaDevices.getUserMedia( J ).then( function ( P ) {
              n.i.L( n, !1 );
              n.qa( r, k, P )
            } ).catch( function ( P ) {
              n.i.L( n, !1 );
              n.i.K( n, {
                code: P.code,
                name: P.name,
                message: P.message
              } )
            } ) ) : ( n.i.L( n, !1 ), n.qa( r, k, G ) )
        } ).catch( function ( H ) {
          this.Ha = null;
          n.i.L( n, !1 );
          d.K( n, "enumerateDevices error",
            H )
        } )
      } else d.K( n, "getUserMedia not available" );
    else n.qa( r, k )
  };
  this.setRemoteDescription = function ( k ) {
    var r = this,
      n = this.T;
    k ? n.c ? n.c.setRemoteDescription( k ).then( function () {
      n.kc = k.sdp;
      if ( n.V && 0 < n.V.length ) {
        for ( var q = 0; q < n.V.length; q++ ) {
          var t = n.V[ q ];
          t && !0 !== t.completed ? n.c.addIceCandidate( t ) : n.c.addIceCandidate( null )
        }
        n.V = []
      }
    }, function () {
      r.i.Qa()
    } ) : r.i.K( r, "no PeerConnection: first create pc" ) : r.i.K( r, "invalid jsep" )
  };
  this.qd = function ( k, r, n, q ) {
    if ( q ) {
      var t = null;
      k || r || !n ? k && r ? t = "sendrecv" : k && !r ? t = "sendonly" :
        !k && r && ( t = "recvonly" ) : t = "inactive";
      if ( t ) try {
        q.setDirection ? q.setDirection( t ) : q.direction = t
      } catch ( z ) {}
    }
  };
  this.rd = function ( k ) {
    var r = null,
      n = null,
      q = this.T.c.getTransceivers();
    if ( q && 0 < q.length ) {
      q = $Sa( q );
      for ( var t = q.next(); !t.done; t = q.next() )
        if ( t = t.value, t.sender && t.sender.track && "audio" === t.sender.track.kind || t.receiver && t.receiver.track && "audio" === t.receiver.track.kind ) r || ( r = t );
        else if ( t.sender && t.sender.track && "video" === t.sender.track.kind || t.receiver && t.receiver.track && "video" === t.receiver.track.kind ) n ||
        ( n = t )
    }
    q = l( k );
    t = m( k );
    this.qd( q, t, k.audio.remove, r );
    r = v( k );
    q = w( k );
    this.qd( r, q, k.video.remove, n )
  };
  this.Hd = function ( k ) {
    var r = this,
      n = this.T,
      q = !0 === k.jb,
      t = {};
    $Su ? this.rd( k ) : ( t.offerToReceiveAudio = m( k ), t.offerToReceiveVideo = w( k ) );
    !0 === k.Me && ( t.iceRestart = !0 );
    var z = v( k );
    if ( z && q && "firefox" === $Sr.browserDetails.browser ) {
      var G = n.c.getSenders().find( function ( I ) {
        return "video" === I.track.kind
      } );
      if ( G ) {
        var A = G.getParameters();
        A || ( A = {} );
        k = e( k.sd );
        A.encodings = [ {
          rid: "f",
          active: !0,
          maxBitrate: k.high
        }, {
          rid: "h",
          active: !0,
          maxBitrate: k.Oa,
          scaleResolutionDownBy: 2
        }, {
          rid: "q",
          active: !0,
          maxBitrate: k.low,
          scaleResolutionDownBy: 4
        } ];
        G.setParameters( A )
      }
    }
    n.c.createOffer( t ).then( function ( I ) {
      I.sdp = I.sdp;
      z && q && ( "chrome" === $Sr.browserDetails.browser || "safari" === $Sr.browserDetails.browser ) && ( I.sdp = h( I.sdp ) );
      n.za = I.sdp;
      n.c.setLocalDescription( I ).catch( function () {
        r.i.Qa()
      } );
      n.Pc = t;
      ( n.zb || n.nb ) && r.i.Ra( r, I )
    }, function () {
      r.i.Qa()
    } )
  };
  this.Gd = function ( k ) {
    var r = this.T,
      n = !0 === k.jb,
      q = null;
    $Su ? this.rd( k ) : "firefox" === $Sr.browserDetails.browser ||
      "edge" === $Sr.browserDetails.browser ? q = {
        offerToReceiveAudio: m( k ),
        offerToReceiveVideo: w( k )
      } : q = {
        mandatory: {
          OfferToReceiveAudio: m( k ),
          OfferToReceiveVideo: w( k )
        }
      };
    v( k ) && n && "firefox" === $Sr.browserDetails.browser && ( n = r.c.getSenders()[ 1 ], n.getParameters(), k = e( k.sd ), n.setParameters( {
      encodings: [ {
        rid: "high",
        active: !0,
        priority: "high",
        maxBitrate: k.high
      }, {
        rid: "medium",
        active: !0,
        priority: "medium",
        maxBitrate: k.Oa
      }, {
        rid: "low",
        active: !0,
        priority: "low",
        maxBitrate: k.low
      } ]
    } ) );
    var t = this;
    r.c.createAnswer( q ).then( function ( z ) {
      var G = {
        type: z.type,
        sdp: z.sdp
      };
      z.sdp = G.sdp;
      r.za = z.sdp;
      r.c.setLocalDescription( z ).catch( function () {
        t.i.Qa()
      } );
      r.Pc = q;
      ( r.zb || r.nb ) && t.i.Ra( t, G )
    }, function () {
      t.i.Qa()
    } )
  };
  this.kd = function ( k ) {
    M.i.Pa( this, k )
  };
  this.me = function () {
    var k = this.T;
    k.za && ( k.za = {
      type: k.c.localDescription.type,
      sdp: k.c.localDescription.sdp
    }, !1 === k.nb && ( k.za.trickle = !1 ), k.Ze = !0, M.i.Ra( this, k.za ) )
  };
  this.da = function ( k, r ) {
    var n = this.T;
    if ( !n.c || !n.f ) return !1;
    if ( k ) {
      if ( !n.f.getVideoTracks() || 0 === n.f.getVideoTracks().length ) return !1;
      n.f.getVideoTracks()[ 0 ].enabled = !r
    } else {
      if ( !n.f.getAudioTracks() || 0 === n.f.getAudioTracks().length ) return !1;
      n.f.getAudioTracks()[ 0 ].enabled = !r
    }
    return !0
  };
  this.Ac = function () {
    var k = this.T;
    if ( k ) {
      if ( k ) {
        k.ha = null;
        k.volume && ( k.volume.local && k.volume.local.G && clearInterval( k.volume.local.G ), k.volume.remote && k.volume.remote.G && clearInterval( k.volume.remote.G ) );
        k.volume = {};
        k.bitrate.G && clearInterval( k.bitrate.G );
        k.bitrate.G = null;
        k.bitrate.Dd = null;
        k.bitrate.Cd = null;
        k.bitrate.Ce = null;
        k.bitrate.Be = null;
        k.bitrate.value = null;
        try {
          if ( !k.Va && k.f )
            for ( var r =
                k.f.getTracks(), n = $Sa( r ), q = n.next(); !q.done; q = n.next() ) {
              var t = q.value;
              t && t.stop()
            }
        } catch ( z ) {}
        k.Va = !1;
        k.f = null;
        try {
          k.c.close()
        } catch ( z ) {}
        k.c = null;
        k.V = null;
        k.za = null;
        k.kc = null;
        k.zb = !1;
        k.O = {};
        k.Jd = null
      }
      this.i.Fb( this )
    }
  }
}
var $Sq, $Sla, $Sr, $Sma, $Ss, $St, $Su;

function $Sw( a, d ) {
  if ( void 0 === d || "undefined" === typeof d ) d = 1;
  if ( null == a || "object" != typeof a ) return a;
  if ( a instanceof Date ) {
    var e = new Date;
    e.setTime( a.getTime() );
    return e
  }
  if ( a instanceof Array ) {
    e = [];
    for ( var f = 0, h = a.length; f < h; f++ ) e[ f ] = $Sw( a[ f ], d - 1 );
    return e
  }
  if ( a && void 0 !== a.byteLength ) return a.slice( 0 );
  if ( 0 == d ) return null;
  if ( a instanceof Object ) {
    e = {};
    for ( f in a ) a.hasOwnProperty( f ) && ( e[ f ] = $Sw( a[ f ], d - 1 ) );
    return e
  }
  throw Error( "Unable to copy obj! type not supported." );
}

function $Sx( a, d ) {
  return d in a && "function" === typeof a[ d ] ? !0 : !1
}

function $Sy() {
  return parseInt( Date.now() )
}

function $Sz() {
  return parseInt( $Sy() / 1E3 )
}

function $SA( a, d, e ) {
  d += e;
  return d > a ? d - a : 0
}

function $SB( a ) {
  return a && void 0 !== a && "undefined" !== typeof a && "" != a ? !1 : !0
}
var $Soa = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split( " " );

function $SC( a ) {
  return 10 > a ? "0" + a : "" + a
}

function $SD( a, d ) {
  var e = new Date,
    f = e.getTime() - 1E3 * ( 3600 * e.getHours() + 60 * e.getMinutes() + e.getSeconds() );
  if ( void 0 === a || "undefined" === typeof a ) a = 0;
  0 < a && e.setTime( a );
  var h = $Soa[ e.getMonth() ] + " " + $SC( e.getDate() ) + ", " + e.getFullYear(),
    l = e.getHours();
  e = e.getMinutes();
  var m = "";
  d && ( m = " AM", 12 <= l && ( m = " PM", 12 < l && ( l -= 12 ) ) );
  d = $SC( l ) + ":" + $SC( e ) + m;
  a >= f ? h = "Today" : 864E5 >= f - a && ( h = "Yesterday" );
  return {
    Id: h,
    time: d
  }
}

function $SE( a ) {
  if ( $SB( a ) ) return 0;
  a = parseInt( a, 10 );
  return isNaN( a ) ? 0 : a
}

function $Spa( a ) {
  window.addEventListener( 0 <= [ "iPad", "iPhone", "iPod" ].indexOf( navigator.platform ) ? "pagehide" : "beforeunload", a )
}

function $Sqa() {
  this.G = -1;
  this.j = null;
  this.host = "";
  this.port = 0;
  this.url = "";
  this.$ = null;
  this.stopped = this.closed = this.l = 0;
  this.b = 10;
  this.g = 30;
  this.delay = this.b;
  this.A = 0
}

function $SF( a ) {
  if ( NaN == this.Ga || void 0 == this.Ga ) this.Ga = {};
  return this.Ga[ a ]
}

function $Sra( a ) {
  if ( NaN == this.Ga || void 0 == this.Ga ) this.Ga = {};
  this.Ga[ a.j ] = a
}
$S = $Sqa.prototype;
$S.start = function () {
  this.stopped = 0;
  this.delay = this.b;
  $Ssa( this )
};
$S.stop = function () {
  $SG( this );
  this.stopped = 1;
  this.disconnect()
};
$S.qc = function ( a, d, e ) {
  this.host = d;
  this.port = e;
  this.url = ( a ? "wss" : "ws" ) + "://" + d + ":" + e
};

function $Sta( a, d ) {
  $SG( a );
  a.G = setTimeout( function () {
    $Ssa( a )
  }, d )
}

function $SG( a ) {
  -1 != a.G && clearInterval( a.G );
  a.G = -1
}
$S.send = function ( a ) {
  this.j && this.j.send( a )
};
$S.cc = function ( a ) {
  null != this.$ && this.$.cc( a )
};
$S.Eb = function () {
  this.l = 1;
  $SG( this );
  this.delay = this.b;
  null != this.$ && this.$.Eb()
};
$S.Db = function () {
  if ( !this.closed ) {
    $SG( this );
    this.closed = 1;
    this.j = null;
    var a = 1;
    null != this.$ && ( a = this.$.Db() );
    a && !this.stopped && ( a = 1E3 * ( 5 + this.delay * Math.random() ), this.delay += 5, this.delay > this.g && ( this.delay = this.g ), $Sta( this, a ) )
  }
};
$S.bc = function () {
  null != this.$ && this.$.bc();
  this.Db()
};

function $Ssa( a ) {
  if ( !a.stopped )
    if ( $SG( a ), 1 === ( null != a.j ? a.j.readyState : 0 ) ) a.j.onopen = function () {
      $SF( this ).Eb()
    };
    else try {
      a.closed = 0, a.l = 0, null != a.$ && $Sua( a.$ ), a.j = new WebSocket( a.url ), $Sra( a ), a.j.binaryType = "arraybuffer", a.j.onopen = function () {
        $SF( this ).Eb()
      }, a.j.onmessage = function ( d ) {
        $SF( this ).cc( d )
      }, a.j.onclose = function () {
        $SF( this ).Db()
      }, a.j.onerror = function () {
        $SF( this ).bc()
      }
    } catch ( d ) {}
}
$S.disconnect = function () {
  $SG( this );
  null != this.j && ( this.j.onclose = function () {}, this.j.onerror = function () {}, this.j.close( 1E3 ), this.j = null )
};

function $Sva( a, d, e ) {
  for ( var f = [], h = Math.max( a.length, d.length ), l = 0, m = 0; m < h || l; ) l = l + ( m < a.length ? a[ m ] : 0 ) + ( m < d.length ? d[ m ] : 0 ), f.push( l % e ), l = Math.floor( l / e ), m++;
  return f
}

function $Swa( a, d, e ) {
  if ( 0 > a ) return null;
  if ( 0 == a ) return [];
  for ( var f = [];; ) {
    a & 1 && ( f = $Sva( f, d, e ) );
    a >>= 1;
    if ( 0 === a ) break;
    d = $Sva( d, d, e )
  }
  return f
}

function $Sxa( a, d, e ) {
  if ( null === a ) return null;
  for ( var f = [], h = [ 1 ], l = 0; l < a.length; l++ ) a[ l ] && ( f = $Sva( f, $Swa( a[ l ], h, e ), e ) ), h = $Swa( d, h, e );
  if ( 16 == e ) {
    e = f;
    l = 0;
    a = [];
    for ( f = 0; f < e.length; f++ ) f & 1 ? ( a[ l ] |= e[ f ] << 4, l++ ) : a[ l ] = e[ f ];
    return a
  }
  a = "";
  for ( l = f.length - 1; 0 <= l; l-- ) a += f[ l ].toString( e );
  return a
}

function $Sya( a ) {
  a: {
    "string" != typeof a && ( a = a.toString() );a = a.split( "" );
    for ( var d = [], e = a.length - 1; 0 <= e; e-- ) {
      var f = parseInt( a[ e ], 10 );
      if ( isNaN( f ) ) {
        a = null;
        break a
      }
      d.push( f )
    }
    a = d
  }
  return $Sxa( a, 10, 16 )
}
ArrayBuffer.b || ( ArrayBuffer.b = function ( a, d ) {
  if ( !( a instanceof ArrayBuffer ) ) throw new TypeError( "Source must be an instance of ArrayBuffer" );
  if ( d <= a.byteLength ) return a.slice( 0, d );
  a = new Uint8Array( a );
  d = new Uint8Array( new ArrayBuffer( d ) );
  d.set( a );
  return d.buffer
} );

function $SH( a, d ) {
  var e = 0;
  for ( --d; 0 <= d; d-- ) e = 256 * e + a[ 0 + d ];
  return e
}

function $Sza( a, d ) {
  for ( var e = 0, f = 0; 4 > f; f++ ) d[ e++ ] = a & 255, a >>>= 8
}

function $SAa( a, d, e, f ) {
  for ( var h = 0; h < d; h++ ) e[ f++ ] = a[ h + 0 ] & 255
}

function $SBa( a, d, e, f ) {
  for ( var h = 0; h < d; h++ ) e[ f++ ] = a.charCodeAt( h + 0 )
}

function $SI( a, d, e ) {
  for ( var f = "", h = d; h < d + e; h++ ) {
    var l = parseInt( a[ h ], 10 );
    if ( 0 == l ) break;
    f += String.fromCharCode( l )
  }
  return f
}

function $SCa( a ) {
  return 65 <= a && 70 >= a ? 10 + ( a - 65 ) : 97 <= a && 103 >= a ? 10 + ( a - 97 ) : 48 <= a && 57 >= a ? a - 48 : -1
}

function $SJ() {
  this.data = []
}
$SJ.prototype.add = function ( a ) {
  this.data.push( a )
};
$SJ.prototype.remove = function () {
  this.data.pop()
};
$SJ.prototype.first = function () {
  return 0 == this.data.length ? null : this.data.shift()
};
$SJ.prototype.size = function () {
  return this.data.length
};

function $SK( a ) {
  this.mode = 0 == a ? 0 : 1;
  this.reset()
}
$SK.prototype.reset = function () {
  this.failed = this.g = this.start = this.b = this.C = 0;
  this.id = this.result = this.D = -1;
  this.bb = this.Ka = 0;
  this.items = this.address = null;
  this.buffer = new Uint8Array( 32 );
  0 == this.mode && ( this.C = 8 )
};

function $SDa( a, d ) {
  a.id = d;
  d = 4;
  a.buffer[ d++ ] = a.id & 255;
  a.buffer[ d++ ] = a.id >> 8 & 255;
  a.buffer[ d++ ] = a.id >> 16 & 255;
  a.buffer[ d++ ] = a.id >> 24 & 255
}
$SK.prototype.wb = function () {
  return this.id
};
$SK.prototype.Ub = function () {
  return this.address
};

function $SEa( a ) {
  var d = 0;
  a.D = a.buffer[ d++ ];
  a.result = a.buffer[ d++ ];
  d++;
  d++;
  a.id = a.buffer[ d ] + 256 * a.buffer[ d + 1 ] + 65536 * a.buffer[ d + 2 ] + 16777216 * a.buffer[ d + 3 ];
  a.b = d + 4
}

function $SFa( a, d ) {
  void 0 == d && console.log( "len undefined" );
  var e = d + a.C;
  if ( !( a.buffer.byteLength > e ) ) {
    if ( 0 < a.b && ( a.buffer.copyWithin( 0, a.b, a.C - a.b ), a.C -= a.b, a.b = 0, e = d + a.C, a.buffer.byteLength > e ) ) return;
    d = e - a.buffer.byteLength;
    64 > d && ( d = 64 );
    d = new Uint8Array( a.buffer.byteLength + d );
    d.set( a.buffer );
    a.buffer = d
  }
}

function $SL( a, d, e ) {
  0 == e && ( e = d.length );
  $SFa( a, e );
  a.buffer.set( new Uint8Array( d ), a.C );
  a.C += e
}

function $SM( a ) {
  return a.buffer.slice( 8, a.C )
}

function $SN( a, d ) {
  0 == d && 0 == a.b && $SEa( a );
  a.g = 0;
  a.items = [];
  for ( a.map = {}; $SGa( a ) && 0 == a.g && 0 == a.failed; );
  return a.failed || 1 != a.mode || 0 == a.g ? null : a.items
}

function $SO( a, d, e, f, h ) {
  if ( !( 0 != a.mode || 2047 < d ) ) {
    $SFa( a, f + 8 );
    2 == d && ( a.g = 1 );
    0 < h && e && 0 < f && ( f = 256 > e ? 1 : 65536 > e ? 2 : 16777216 > e ? 3 : 4294967296 > e ? 4 : 1099511627776 > e ? 5 : 281474976710656 > e ? 6 : 72057594037927936 > e ? 7 : 8 );
    var l = 0;
    16777215 < f ? l = 4 : 65535 < f ? l = 3 : 255 < f ? l = 2 : 0 < f && ( l = 1 );
    var m = 1,
      v = d & 31,
      w = 0;
    31 < d || 2 < l ? ( m = 2, v |= 224 ) : 5 > f ? ( l = 0, w = f ) : w = l + 4;
    a.buffer[ a.C++ ] = v | w << 5;
    1 < m && ( a.buffer[ a.C++ ] = d >> 5 | l - 1 << 6 );
    l && $SHa( a, f, l );
    if ( h ) $SHa( a, e, f );
    else
      for ( d = f, f = 0; f < d; f++ ) a.buffer[ a.C++ ] = e[ f + 0 ] & 255
  }
}

function $SHa( a, d, e ) {
  for ( var f = 0; f < e; f++ ) a.buffer[ a.C++ ] = d & 255, d /= 256
}

function $SIa( a, d, e ) {
  for ( var f = 0; e--; ) f *= 256, f += a.buffer[ d + e ] & 255;
  return f
}

function $SP( a, d, e, f ) {
  6 == d ? a.Ka = e : 3 == d && ( a.bb = e );
  $SO( a, d, e, f, 1 )
}

function $SQ( a, d, e ) {
  void 0 != e && null != e && ( e = parseInt( e ), 0 != e && $SP( a, d, e, 1 ) )
}

function $SR( a, d, e, f, h ) {
  4 == d && ( a.address = e );
  if ( "[object String]" === Object.prototype.toString.call( e ) )
    if ( h ) e = ( new TextEncoder( "utf-8" ) ).encode( e );
    else {
      h = e.length;
      for ( var l = new Uint8Array( h ), m = 0; m < h; m++ ) l[ m ] = e.charCodeAt( m );
      e = l
    }
  else e = Uint8Array.from( e );
  if ( 0 == f || void 0 == f ) f = e.byteLength;
  $SO( a, d, e, f, 0 )
}

function $SS( a, d, e ) {
  for ( var f = e.length, h = new Uint8Array( f + 1 ), l = 0; l < f; l++ ) h[ l ] = e.charCodeAt( l );
  h[ f ] = 0;
  e = h;
  $SO( a, d, e, e.byteLength, 0 )
}

function $SJa( a, d, e ) {
  e = ( new TextEncoder( "utf-8" ) ).encode( e );
  for ( var f = e.length, h = new Uint8Array( f + 1 ), l = 0; l < f; l++ ) h[ l ] = e[ l ];
  h[ f ] = 0;
  e = h;
  $SO( a, d, e, e.byteLength, 0 )
}

function $SGa( a ) {
  var d = {},
    e = a.buffer[ a.b ],
    f = e >> 5,
    h = 0;
  e &= 31;
  var l = f,
    m = 1;
  if ( 1 == e && 0 < a.items.length ) return a.g = 1, !0;
  5 == f || 6 == f ? h = f - 4 : 7 == f && ( f = a.buffer[ a.b + 1 ], h = ( f >> 6 ) + 1, e |= ( f & 63 ) << 5, m = 2 );
  if ( a.C < a.b + m + h ) return !1;
  d.type = e;
  h && ( l = $SIa( a, a.b + m, h ) );
  if ( a.C < a.b + m + h + l ) return !1;
  d.len = l;
  d.val = 0;
  f = m + h + a.b;
  d.data = a.buffer.slice( f, f + l );
  4 >= l && ( d.val = $SIa( a, a.b + m + h, l ) );
  a.items.push( d );
  a.map[ e ] = d;
  a.b += m + h + l;
  a.b == a.C && ( a.g = 1, a.C = 0, a.b = 0 );
  return !0
}
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.g || {
  READ_WRITE: "readwrite"
};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.b;

function $SKa() {
  if ( !( "indexedDB" in window ) ) return !1;
  $SLa( this )
}

function $SLa( a ) {
  $Sn( function ( d ) {
    a.db = null;
    a.ready = !1;
    d.b = 0
  } )
}

function $SMa( a, d, e ) {
  var f, h;
  $Sn( function ( l ) {
    a.Ie = d;
    f = a;
    h = window.indexedDB.open( d, 1 );
    h.onerror = function () {
      e( null )
    };
    h.onsuccess = function ( m ) {
      f.db = m.target.result;
      f.ready = !0;
      e( f.db )
    };
    h.onupgradeneeded = function ( m ) {
      f.db = m.target.result;
      $SNa( f );
      $SOa( f )
    };
    l.b = 0
  } )
}
$SKa.prototype.open = function ( a, d ) {
  var e = this,
    f, h;
  return $Sn( function ( l ) {
    f = e;
    if ( "function" === typeof d ) return $SMa( f, a, d ), l.return();
    h = new Promise( function ( m ) {
      $SMa( f, a, m )
    } );
    return l.return( h )
  } )
};

function $SNa( a ) {
  a = a.db.createObjectStore( "messages", {
    autoIncrement: !0
  } );
  a.createIndex( "peer", [ "peer", "groupid" ], {
    unique: !1
  } );
  a.createIndex( "ts", "ts", {
    unique: !1
  } );
  a.createIndex( "id", "id", {
    unique: !0
  } );
  a.transaction.oncomplete = function () {}
}

function $SOa( a ) {
  a = a.db.createObjectStore( "contacts", {
    keyPath: [ "address", "groupid" ]
  } );
  a.createIndex( "address", "address", {
    unique: !1
  } );
  a.createIndex( "groupid", "groupid", {
    unique: !1
  } );
  a.createIndex( "name", "name", {
    unique: !1
  } );
  a.createIndex( "ts", "ts", {
    unique: !1
  } );
  a.transaction.oncomplete = function () {}
}

function $ST( a ) {
  return a.db.transaction( [ "messages" ], "readwrite" ).objectStore( "messages" )
}

function $SPa( a ) {
  return a.db.transaction( [ "contacts" ], "readwrite" ).objectStore( "contacts" )
}

function $SQa( a, d ) {
  if ( !( 0 == d.id || 0 < d.channel || d.flag & 12 ) ) {
    var e = $Sw( d, 1 );
    d.hasOwnProperty( "data" ) && !e.hasOwnProperty( "data" ) && ( e.data = d.data, e.datalen = d.datalen );
    0 < e.groupid && ( e.sender = e.peer, e.peer = "" );
    delete e.fid;
    delete e.user;
    delete e.group;
    delete e.date;
    e.Z && ( delete e.Z, delete e.vb );
    $ST( a ).add( e )
  }
}

function $SRa( a, d ) {
  a = $SPa( a );
  d = $Sw( d, 2 );
  d.groupid = $SE( d.groupid );
  delete d.status;
  d = a.put( d );
  d.onerror = function () {};
  d.onsuccess = function () {}
}

function $SSa( a, d ) {
  a = $SPa( a ).index( "name" ).getAll();
  a.onerror = function () {
    d( [] )
  };
  a.onsuccess = function ( e ) {
    d( e.target.result )
  }
}

function $STa( a, d ) {
  var e, f, h;
  $Sn( function ( l ) {
    if ( 1 == l.b ) {
      e = a;
      if ( "function" === typeof d ) return $SSa( e, d ), l.return();
      f = new Promise( function ( m ) {
        $SSa( e, m )
      } );
      h = null;
      return $Si( l, f.then( function () {} ), 2 )
    }
    return l.return( h )
  } )
}
$SKa.prototype.read = function ( a, d, e, f, h ) {
  var l = $ST( this );
  if ( null == a || void 0 == a ) a = "";
  if ( null == d || void 0 == d ) d = 0;
  if ( 0 != d || "" != a ) return l.index( "ts" ).openCursor( null, "prev" ).onsuccess = function ( m ) {
    if ( m = m.target.result ) {
      if ( e ) try {
        var v = e;
        e = 0;
        m.advance( v );
        return
      } catch ( w ) {
        h( null );
        return
      }
      if ( v = m.value ) {
        0 < v.groupid && v.hasOwnProperty( "sender" ) && ( v.peer = v.sender, delete v.sender );
        if ( 0 < d && v.groupid == d || 0 == d && v.peer == a )
          if ( h( v ), f--, 0 == f ) {
            h( null );
            return
          } try {
          m.continue()
        } catch ( w ) {
          h( null )
        }
      } else h( null )
    } else h( null )
  }, !0
};

function $SUa( a, d, e ) {
  $SVa( a, d, function ( f ) {
    if ( f ) {
      var h = $ST( a ),
        l = h.index( "id" ).getKey( d );
      l ? l.onsuccess = function ( m ) {
        m = m.target.result;
        h = $ST( a );
        h.delete( m ).onsuccess = function () {
          e( f )
        }
      } : e( !1 )
    } else e( !1 )
  } )
}

function $SWa( a, d, e, f ) {
  if ( null == d || void 0 == d ) d = "";
  if ( null == e || void 0 == e ) e = 0;
  d = [ d, e ];
  var h = $ST( a );
  ( d = h.index( "peer" ).getAllKeys( d ) ) ? d.onsuccess = function ( l ) {
    l = l.target.result;
    var m = l.length;
    if ( m )
      for ( ; 0 < l.length; ) {
        var v = l.shift();
        h = $ST( a );
        h.delete( v ).onsuccess = function () {
          m--;
          0 == m && f( !0 )
        }
      } else f( !1 )
  }: f( !1 )
}

function $SU( a, d, e, f, h ) {
  a = $ST( a );
  if ( null == e || void 0 == e ) e = "";
  if ( null == f || void 0 == f ) f = 0;
  a = a.index( "peer" );
  e = IDBKeyRange.only( [ e, f ] );
  var l = !1;
  a.openCursor( e, "prev" ).onsuccess = function ( m ) {
    if ( m = m.target.result ) {
      var v = m.value;
      if ( v && ( !l || 3 != h || 2 == v.status ) ) {
        if ( v.id == d || 3 == h && l )
          if ( l = !0, v.status = h, m.update( v ).onsuccess = function () {}, 3 != h ) return;
        try {
          m.continue()
        } catch ( w ) {}
      }
    }
  }
}

function $SVa( a, d, e ) {
  a = $ST( a ).index( "id" );
  d = IDBKeyRange.only( d );
  a.openCursor( d ).onsuccess = function ( f ) {
    ( f = f.target.result ) ? ( f = f.value, f.hasOwnProperty( "data" ) || ( f.data = f.message, f.datalen = f.mlen ), e( f ) ) : e( null )
  };
  return !0
}

function $SXa( a ) {
  var d = window.localStorage;
  this.name = a + "_";
  this.storage = d;
  this.md = JSON
}
$SXa.prototype = {
  clear: function () {
    this.storage.clear();
    return this
  },
  getItem: function ( a, d ) {
    a = this.storage.getItem( this.name + a );
    return null == a ? "undefined" != typeof d ? d : null : this.md.parse( a )
  },
  removeItem: function ( a ) {
    this.storage.removeItem( this.name + a );
    return this
  },
  setItem: function ( a, d ) {
    this.storage.setItem( this.name + a, this.md.stringify( d ) );
    return this
  }
};

function $SYa( a ) {
  if ( a.pa && !a.hb )
    if ( a.ca ) a.send( a.ca );
    else {
      var d = a.$c.first();
      if ( null != d ) {
        d.flag & 8 && ( d.flag &= -4, d.flag |= 1064964 );
        d.flag & 1024 && ( d.flag &= -4, d.flag |= 1048580 );
        a.Sc = [];
        var e = new $SK( 0 );
        d.id && a.Sc.push( d.id );
        e.D = 2;
        e.result = 1;
        e.id = 0;
        var f = parseInt( d.fid, 10 ) & 65535;
        $SP( e, 17, f, 2 );
        $SP( e, 1, 0, 0 );
        f = parseInt( d.id, 10 );
        0 < f && $SP( e, 3, f, 4 );
        f = parseInt( d.channel, 10 );
        0 < f && $SP( e, 10, f, 1 );
        f = parseInt( d.type, 10 );
        0 < f && $SP( e, 11, f, 1 );
        f = parseInt( d.flag, 10 );
        0 < f && $SP( e, 9, f, 4 );
        d.hasOwnProperty( "groupid" ) ? ( f = parseInt( d.groupid,
          10 ), 0 < f ? $SP( e, 6, f, 4 ) : $SR( e, 4, d.peer, 0, !1 ) ) : $SR( e, 4, d.peer, 0, !1 );
        f = parseInt( d.expiry, 10 );
        f != a.ac && $SP( e, 8, f, 4 );
        f = parseInt( d.refid, 10 );
        0 < f && $SP( e, 13, f, 4 );
        0 < d.Z && ( $SP( e, 29, d.Z, 4 ), $SP( e, 30, d.count, 4 ), $SP( e, 19, d.vb, 4 ) );
        d.data ? $SR( e, 7, d.data, 0, !0 ) : $SR( e, 7, d.message, 0, !0 );
        a.ca = e;
        a.send( a.ca )
      }
    }
}
$S = $SV.prototype;
$S.M = function ( a, d, e ) {
  var f = this.j;
  if ( !f.j && !f.stopped ) {
    var h = $Sz();
    5 > h - f.A || ( f.A = h, $SG( f ), $Ssa( f ) )
  }
  if ( !a.hasOwnProperty( "peer" ) && !a.hasOwnProperty( "groupid" ) ) return !1;
  a = $Sw( a );
  a.groupid = $SE( a.groupid );
  if ( 0 < a.groupid || !a.hasOwnProperty( "peer" ) ) a.peer = "";
  a.status = 0;
  "[object String]" === Object.prototype.toString.call( e ) ? a.message = e : a.data = e;
  a.id = d;
  a.fid = this.Nd++;
  a.origin = 0;
  a.hasOwnProperty( "expiry" ) || ( a.expiry = this.ac );
  a.hasOwnProperty( "channel" ) || ( a.channel = 0 );
  a.hasOwnProperty( "type" ) || ( a.type = 0 );
  a.hasOwnProperty( "flag" ) ||
    ( a.flag = 3 );
  a.hasOwnProperty( "refid" ) || ( a.refid = 0 );
  this.$c.add( a );
  $SYa( this );
  0 < a.id && ( a.ts = $Sy(), $SZa( this, a ) );
  return !0
};
$S.Md = function ( a, d, e ) {
  var f = this;
  return $SVa( this.db, e, function ( h ) {
    if ( !h || h.flag & 4194304 ) return !1;
    h.flag |= 64;
    delete h.groupid;
    delete h.peer;
    a.hasOwnProperty( "groupid" ) && ( h.groupid = a.groupid );
    a.hasOwnProperty( "peer" ) && ( h.peer = a.peer );
    return f.M( h, d, h.data )
  } )
};
$S.ge = function ( a, d ) {
  if ( 4294967295 < d ) return !1;
  var e = this;
  return $SVa( this.db, d, function ( f ) {
    if ( !( f && f.status & 128 ) ) return !1;
    e.Ya( d );
    return e.M( f, d, f.data )
  } )
};
$S.ke = function ( a, d, e ) {
  if ( !a.hasOwnProperty( "peer" ) && !a.hasOwnProperty( "groupid" ) ) return !1;
  a = $Sw( a );
  a.flag |= 256;
  var f = new $SK( 0 );
  e.hasOwnProperty( "filetype" ) && ( $SP( f, 16, e.filetype, 2 ), a.filetype = e.filetype );
  e.hasOwnProperty( "filesize" ) && ( $SP( f, 17, e.filesize, 4 ), a.filesize = e.filesize );
  e.hasOwnProperty( "fileflags" ) && ( $SP( f, 18, e.fileflags, 4 ), a.fileflags = e.fileflags );
  e.hasOwnProperty( "fileurl" ) && ( $SS( f, 19, e.fileurl ), a.fileurl = e.fileurl );
  e.hasOwnProperty( "title" ) && ( $SJa( f, 1, e.title ), a.title = e.title );
  e.hasOwnProperty( "message" ) &&
    ( $SJa( f, 2, e.message ), a.message = e.message );
  e.hasOwnProperty( "launchurl" ) && ( $SS( f, 3, e.launchurl ), a.launchurl = e.launchurl );
  e.hasOwnProperty( "tn" ) && ( $SR( f, 4, e.tn, 0, !1 ), a.tn = e.tn );
  e = $SM( f );
  return this.M( a, d, e )
};
$S.le = function ( a, d ) {
  if ( !a.hasOwnProperty( "peer" ) && !a.hasOwnProperty( "groupid" ) ) return !1;
  a = $Sw( a );
  a.flag = 1048836;
  a.expiry = 0;
  var e = new $SK( 0 );
  $SP( e, 21, d, 2 );
  return this.M( a, 0, $SM( e ) )
};
$S.jd = function ( a, d ) {
  if ( !a.hasOwnProperty( "peer" ) && !a.hasOwnProperty( "groupid" ) ) return !1;
  a = $Sw( a );
  a.channel = 129;
  a.flag = 256;
  a.expiry = 2592E3;
  var e = new $SK( 0 );
  d = $Sya( d );
  $SO( e, 20, d, d.length, 0 );
  return this.M( a, this.random(), $SM( e ) )
};

function $SZa( a, d ) {
  d.date = $SD( d.ts );
  if ( !( !d.id || d.channel || d.flag & 516 ) ) {
    d.user = a.Za( d.peer, 0 );
    d.group = null;
    d.groupid && ( d.group = a.Za( "", d.groupid ) );
    var e = d.group ? d.group : d.user;
    if ( !e.lastMessage || d.ts >= e.lastMessage.ts ) {
      e.lastMessage = d;
      if ( 0 == d.origin ) {
        e.ts = e.lastMessage.ts;
        $SW( a, e );
        for ( var f = 0, h = 0; h < a.P.length; h++ )
          if ( 0 < e.groupid && a.P[ h ].groupid == e.groupid || e.address == a.P[ h ].address ) {
            0 != h && ( a.P.splice( h, 1 )[ 0 ], a.P.unshift( e ) );
            f = 1;
            break
          } 0 == f && a.P.unshift( e )
      }
      d.Z && $S_a( a )
    }
    if ( d.Z ) $SQa( a.db, d );
    else {
      for ( var l in a.ma ) e =
        a.ma[ l ], f = e, h = d, $S0a( f, h ) ? ( 18 != h.status || f.Fa && 1 != h.origin || self.ba && !( h.wa > self.ba.wa ) || ( self.ba = h ), 1 == h.origin ? f.I.unshift( h ) : ( f.I.push( h ), $S1a( f, h ) ), f = !0 ) : f = !1, f && e.Fa && 18 == d.status && ( d.status = 19 );
      a.Rc[ d.id ] = d;
      a.db && 0 == d.origin && $SQa( a.db, d )
    }
  }
}

function $S2a( a ) {
  a.ca = null;
  setTimeout( function () {
    $SYa( a )
  }, a.Hc )
}

function $S3a( a, d, e, f ) {
  if ( !a.Zb || a.$b & 4096 ) {
    var h = " ";
    if ( d ) {
      e = new Uint8Array( 8 * d.length );
      for ( f = 0; f < 8 * d.length; f++ ) e[ f ] = 0;
      for ( f = 0; f < d.length; f++ ) {
        h = $Sya( d[ f ] );
        for ( var l = h.length, m = 0; m < l; m++ ) e[ 8 * f + m ] = h[ m ]
      }
      h = e;
      e = "1";
      f = 0
    }
    d = a.random();
    l = {};
    l.groupid = f;
    l.channel = 0;
    l.type = 27;
    l.expiry = 3600;
    l.flag = 1028;
    l.peer = e;
    a.M( l, d, h )
  }
}
$S.Ya = function ( a ) {
  this.tb( [ a ], null, 0, 0 )
};
$S.tb = function ( a, d, e ) {
  var f = this;
  if ( a ) {
    for ( var h in a ) $SUa( this.db, a[ h ], function ( l ) {
      $S4a( f, l.peer, l.groupid )
    } );
    $S3a( f, a, d, e )
  } else $SWa( this.db, d, e, function ( l ) {
    $S4a( f, d, e );
    l && $S3a( f, null, d, e )
  } )
};

function $S5a( a, d, e ) {
  a = a.substring( d, d + e );
  return parseInt( a, 16 )
}

function $S6a( a, d ) {
  var e = d.length;
  a.Ae = d.substring( 0, 32 );
  for ( var f = new Uint8Array( 16 ), h = 0; 32 > h; h += 2 ) f[ h >> 1 ] = parseInt( d.substr( h, 2 ), 16 );
  a.cookie = f;
  f = 32 + parseInt( d[ 11 ], 16 ) / 2;
  h = d.substring( f, e );
  var l = 15 - parseInt( h[ 0 ], 16 );
  a.uid = $S5a( h, 1, l ) ^ $S5a( h, 1 + l, l );
  f += 1 + 2 * l;
  h = d.substring( f, e );
  l = 15 - parseInt( h[ 0 ], 16 );
  h = d.substring( f + ( 1 + 2 * l ), e );
  a.Nb = parseInt( h, 16 );
  0 != a.uid && 0 != l && 0 != a.Nb || console.log( "Invalid token: " + d )
}

function $S7a( a, d, e, f, h, l ) {
  var m = new Uint8Array( 4 + f.byteLength + h.byteLength + l.length );
  $Sza( d, m );
  $SAa( h, h.byteLength, m, 4 );
  $SAa( f, f.byteLength, m, 4 + h.byteLength );
  $SBa( l, l.length, m, 4 + f.byteLength + h.byteLength );
  crypto.subtle.digest( "SHA-256", m ).then( function ( v ) {
    v = new Uint8Array( v );
    var w = new $SK( 0 );
    w.D = 1;
    w.result = 1;
    w.id = e;
    $SR( w, 11, v, v.byteLength, !1 );
    0 < a.ga.length && $SR( w, 16, a.ga, a.ga.byteLength, !1 );
    a.send( w )
  } )
}

function $S8a( a ) {
  0 != a.pa && ( a.ra && $S9a( a ), $S$a( a ), a.Bb = setTimeout( function () {
    $S9a( a )
  }, a.Kc ) )
}

function $S$a( a ) {
  -1 != a.Bb && clearInterval( a.Bb );
  a.Bb = -1
}

function $S9a( a ) {
  if ( 0 != a.pa ) {
    var d = new $SK( 0 ),
      e = a.ra;
    d.D = 16;
    d.result = 0;
    d.id = e;
    a.ra = 0;
    a.send( d )
  }
}

function $Sab( a ) {
  this.notify = a;
  this.Vb = this.flags = 0;
  this.startTime = this.f = this.Ta = this.$a = this.c = null;
  this.videoWidth = this.videoHeight = 0;
  this.Uc = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };
  this.De = {
    urls: [ "turn:turn.mesibo.com:19305?transport=udp", "turn:[2404:6800:4008:c06::7f]:19305?transport=udp", "turn:turn.mesibo.com:19305?transport=tcp", "turn:[2404:6800:4008:c06::7f]:19305?transport=tcp" ],
    username: this.notify.Nb,
    credential: this.notify.Ae,
    maxRateKbps: "8000"
  };
  this.configuration = {
    iceServers: [ {
      urls: "stun:stun.l.google.com:19302"
    } ]
  }
}
$S = $Sab.prototype;
$S.La = function ( a, d ) {
  if ( !d ) return !1;
  a && ( this.$a = document.getElementById( a ) );
  return ( this.Ta = document.getElementById( d ) ) ? !0 : !1
};
$S.U = function ( a ) {
  if ( this.notify ) {
    var d = this.notify;
    d.a && d.a && ( d.a.sa = $Sy(), d.a.ec = 2 == a ? 1 : 0, 16 == a && ( d.a.w = null ), 16 == a ? $Sbb( d, 0, 98, 0 ) : 2 == a ? ( d.a.ee++, $SX( d, 48 ) ) : 3 == a && $SX( d, 50 ) )
  }
};

function $Scb( a, d ) {
  d = JSON.stringify( d );
  if ( a.notify && ( a = a.notify, a.a && a.a ) ) {
    a.a.sa = $Sy();
    a.a.Ua |= 1;
    var e = 8;
    a.a.oc && ( e = 5, a.a.oc = 0 );
    a.U( a.a.id, null, e, d, 0 )
  }
}

function $Sdb( a, d ) {
  return $Sn( function ( e ) {
    if ( 1 == e.b ) return e.g = 2, $Si( e, a.c.setLocalDescription( d ), 4 );
    if ( 2 != e.b ) return $Scb( a, d ), $Sj( e, 0 );
    $Sk( e );
    e.b = 0
  } )
}

function $Seb( a ) {
  $Sn( function ( d ) {
    return a.f ? $Si( d, a.f.getTracks().forEach( function ( e ) {
      return e.stop()
    } ), 0 ) : d.return()
  } )
}

function $Sfb( a, d ) {
  var e;
  return $Sn( function ( f ) {
    switch ( f.b ) {
      case 1:
        return a.$a && a.$a.addEventListener( "loadedmetadata", function () {} ), a.Ta.addEventListener( "loadedmetadata", function () {} ), d && a.Ta.addEventListener( "resize", function () {
          a.startTime && ( window.performance.now(), a.startTime = null )
        } ), f.g = 2, $Si( f, navigator.mediaDevices.getUserMedia( {
          audio: !0,
          video: !0
        } ), 4 );
      case 4:
        return e = f.N, a.$a && ( a.$a.srcObject = e ), a.f = e, f.return( !0 );
      case 2:
        $Sk( f );
      case 3:
        return f.return( !1 )
    }
  } )
}

function $Sgb( a, d ) {
  return $Sn( function ( e ) {
    if ( a.c ) return e.return( !0 );
    if ( !a.f && !$Sfb( a, d ) ) return e.return( !1 );
    a.startTime = window.performance.now();
    d && a.f.getVideoTracks();
    a.f.getAudioTracks();
    a.c = new RTCPeerConnection( a.configuration );
    a.c.onicecandidate = function ( f ) {
      if ( f.candidate ) {
        var h = {
          type: "candidate"
        };
        h.candidate = f.candidate.candidate;
        h.id = f.candidate.sdpMid;
        h.label = f.candidate.sdpMLineIndex;
        $Scb( a, h )
      }
    };
    a.c.oniceconnectionstatechange = function () {
      var f = a.c.iceConnectionState;
      "failed" === f || "closed" ===
        f ? a.R() : "connected" === f ? a.U( 2 ) : "disconnected" === f && a.U( 3 )
    };
    a.c.ontrack = function ( f ) {
      a.Ta.srcObject !== f.streams[ 0 ] && ( a.Ta.srcObject = f.streams[ 0 ] )
    };
    a.f.getTracks().forEach( function ( f ) {
      return a.c.addTrack( f, a.f )
    } );
    return e.return( !0 )
  } )
}
$S.call = function ( a ) {
  var d = this,
    e;
  return $Sn( function ( f ) {
    switch ( f.b ) {
      case 1:
        return d.configuration.iceServers.push( d.De ), $Si( f, $Sgb( d, a ), 2 );
      case 2:
        return f.g = 3, d.Uc.offerToReceiveVideo = a ? 1 : 0, $Si( f, d.c.createOffer( d.Uc ), 5 );
      case 5:
        return e = f.N, $Si( f, $Sdb( d, e ), 6 );
      case 6:
        $Sj( f, 0 );
        break;
      case 3:
        $Sk( f ), f.b = 0
    }
  } )
};
$S.answer = function ( a, d, e ) {
  var f = this,
    h, l;
  return $Sn( function ( m ) {
    switch ( m.b ) {
      case 1:
        return $Si( m, $Sgb( f, e ), 2 );
      case 2:
        return h = JSON.parse( d ), m.g = 3, $Si( m, f.c.setRemoteDescription( h ), 5 );
      case 5:
        $Sj( m, 4 );
        break;
      case 3:
        $Sk( m );
      case 4:
        return m.g = 6, $Si( m, f.c.createAnswer(), 8 );
      case 8:
        return l = m.N, $Si( m, $Shb( f, l ), 9 );
      case 9:
        $Sj( m, 0 );
        break;
      case 6:
        $Sk( m ), m.b = 0
    }
  } )
};
$S.R = function () {
  this.c && ( this.c.close(), this.c = null );
  this.Vb = 1;
  $Seb( this )
};

function $Shb( a, d ) {
  return $Sn( function ( e ) {
    if ( 1 == e.b ) return e.g = 2, $Si( e, a.c.setLocalDescription( d ), 4 );
    if ( 2 != e.b ) return $Scb( a, d ), $Sj( e, 0 );
    $Sk( e );
    e.b = 0
  } )
}
$S.da = function ( a, d, e, f ) {
  if ( this.c ) {
    if ( a ) {
      a = $Sa( this.c.getSenders() );
      for ( var h = a.next(); !h.done; h = a.next() )( h = h.value ) && h.track && "audio" === h.track.kind && ( h.track.enabled = !d )
    }
    if ( e )
      for ( d = $Sa( this.c.getSenders() ), h = d.next(); !h.done; h = d.next() )( h = h.value ) && h.track && "video" === h.track.kind && ( h.track.enabled = !f )
  }
};

function $Sib( a, d ) {
  var e, f, h;
  $Sn( function ( l ) {
    switch ( l.b ) {
      case 1:
        e = JSON.parse( d );
        if ( "candidate" == e.type ) return h = new RTCIceCandidate( {
          candidate: e.candidate,
          sdpMid: e.id
        } ), l.g = 12, $Si( l, a.c.addIceCandidate( h ), 14 );
        if ( "answer" != e.type ) {
          l.b = 0;
          break
        }
        l.g = 5;
        return $Si( l, a.c.setRemoteDescription( e ), 7 );
      case 7:
        $Sj( l, 6 );
        break;
      case 5:
        $Sk( l );
      case 6:
        return l.g = 8, $Si( l, a.c.createAnswer(), 10 );
      case 10:
        return f = l.N, $Si( l, $Shb( a, f ), 11 );
      case 11:
        $Sj( l, 0 );
        break;
      case 8:
        $Sk( l );
        l.b = 0;
        break;
      case 14:
        $Sj( l, 0 );
        break;
      case 12:
        $Sk( l ),
          l.b = 0
    }
  } )
}

function $Sjb( a, d, e, f, h ) {
  a.a = {};
  a.a.id = e;
  a.a.bb = 0;
  a.a.Fd = 0;
  a.a.channel = 0;
  a.a.ic = 0;
  a.a.ld = 0;
  a.a.state = 0;
  a.a.mode = f;
  a.a.video = h;
  a.a.Ve = 0;
  a.a.Ne = 0;
  a.a.ja = 0;
  a.a.bd = 0;
  a.a.qb = 0;
  a.a.Qb = 0;
  a.a.S = 0;
  a.a.oc = 0;
  a.a.kb = 0;
  a.a.Ua = 0;
  a.a.Vb = 0;
  a.a.Ic = 0;
  a.a.callee = 0;
  a.a.Tc = 0;
  a.a.ec = 0;
  a.a.ee = 0;
  a.a.Le = 0;
  a.a.yc = 0;
  a.a.pc = 0;
  a.a.jc = 0;
  a.a.Vc = 0;
  a.a.Dc = 0;
  a.a.gb = 0;
  a.a.sa = 0;
  a.a.df = 0;
  a.a.ia = 0;
  a.a.w = null;
  a.a.dd = 0;
  a.a.gd = 0;
  a.a.td = $Sy();
  a.a.ta = d;
  a.a.timeout = a.m.wd;
  1 == f && ( a.a.timeout = a.m.Ob );
  $SY( a, 2E3 )
}

function $SZ( a ) {
  a.Yb = null;
  a.lc = null;
  a.pb = null;
  a.a = null;
  a.w = null;
  a.Cb = !0
}

function $S_( a, d ) {
  a.a && ( a.G && clearTimeout( a.G ), a.G = null, console.log( a.a.w ), a.a.w && ( a.a.w.R(), a.a.w = null ), 0 < d && $SX( a, d ), $SZ( a ) )
}

function $Skb( a, d, e ) {
  if ( a.a ) {
    0 == d && ( d = a.a.id );
    if ( 71 != e ) {
      if ( a.a.ic & 64 ) return;
      a.a.ic = e
    }
    null != a.notify && ( 1 == e ? $Sx( a.notify, "Mesibo_OnCall" ) && a.notify.Mesibo_OnCall( d, a.a.ta, a.a.video ) : $Sx( a.notify, "Mesibo_OnCallStatus" ) && a.notify.Mesibo_OnCallStatus( d, e ) )
  }
}

function $SX( a, d ) {
  a.a && $Skb( a, a.a.id, d )
}

function $Slb( a ) {
  var d = new $SK( 0 );
  $SP( d, 1, a.id, 4 );
  $SP( d, 2, a.status, 2 );
  a.hasOwnProperty( "type" ) && $SP( d, 3, a.type, 2 );
  a.hasOwnProperty( "flag" ) && $SP( d, 4, a.s, 4 );
  a.hasOwnProperty( "to_keepalive" ) && $SP( d, 7, a.lb, 4 );
  a.hasOwnProperty( "to_answer" ) && $SP( d, 8, a.Wa, 4 );
  a.hasOwnProperty( "to_request" ) && $SP( d, 9, a.mb, 4 );
  a.hasOwnProperty( "sdp" ) && $SS( d, 5, a.sdp );
  a.hasOwnProperty( "message" ) && $SS( d, 16, a.message );
  a.hasOwnProperty( "tn" ) && $SR( d, 18, a.bf, 0, !1 );
  $SP( d, 0, 0, 1 );
  return $SM( d )
}

function $Smb( a, d, e ) {
  var f = {};
  f.id = d;
  f.status = e;
  f.s = 0;
  e = {};
  e.id = a.random();
  e.expiry = 60;
  e.flag = 1049093;
  e.refid = d;
  e.channel = 128;
  f = $Slb( f );
  a.M( e, d, f )
}
$S = $SV.prototype;
$S.U = function ( a, d, e, f, h ) {
  !d && this.a && ( d = this.a.ta );
  !a && this.a && ( a = this.a.id );
  if ( !d || this.a.ld & 64 ) return -1;
  var l = {};
  l.id = a;
  l.status = e;
  f && ( l.sdp = f );
  l.flag = h | 16;
  this.a.timeout = this.m.Ob;
  a = {};
  this.a.bb = this.random();
  a.id = this.a.bb;
  a.expiry = 30;
  e & 64 && ( a.expiry = 60 );
  a.flag = 1049093;
  a.refid = this.a.id;
  a.channel = 128;
  a.peer = d;
  1 == e ? ( l.lb = this.m.Ob, l.Wa = this.m.Wa, l.mb = this.m.mb, this.a.timeout = this.m.wd ) : 67 == e ? this.m.Ed && this.a.ja && ( l.s |= 8 ) : 3 == l.status ? this.a.bd = 1 : 5 == l.status && ( this.a.ja = 1 );
  if ( 1 == l.status || 5 == l.status ) l.s |=
    1, this.a.video && ( l.s |= 2 ), this.m.tc & 2 && ( l.s |= 131072 ), this.m.tc & 1 && ( l.s |= 65536 ), this.m.tc & 32 && ( l.s |= 262144 ), l.s |= 524288;
  this.a.state = 1;
  this.a.pc = $Sy();
  this.a.ld = e;
  d = $Slb( l );
  return this.M( a, a.id, d )
};
$S.se = function ( a ) {
  this.a && 0 != this.a.mode || $SZ( this );
  if ( !a ) return !1;
  this.pb = a;
  return $Snb( this, !1 )
};
$S.re = function ( a, d, e ) {
  this.a && 0 != this.a.mode || $SZ( this );
  if ( !a || !d ) return !1;
  this.Yb = a;
  this.lc = d;
  return e ? $Snb( this, !0 ) : !0
};

function $Sob( a ) {
  a.fd || ( a.fd = 1, "undefined" === typeof adapter && ( a = document.createElement( "script" ), a.type = "application/javascript", a.src = "https://webrtc.github.io/adapter/adapter-latest.js", document.body ? document.body.appendChild( a ) : console.log( "document body missing" ) ) )
}

function $Snb( a, d ) {
  $Sob( a );
  if ( a.w ) return !0;
  a.w = new $Sab( a );
  d ? a.w.La( a.Yb, a.lc ) : a.w.La( null, a.pb );
  a.Cb = $Sfb( a.w, d );
  return a.Cb
}
$S.call = function ( a ) {
  if ( this.Yb || this.lc || this.pb ) {
    var d = !0;
    this.pb && ( d = !1 );
    if ( d && this.Gc & 8 || this.Gc & 2 ) return $SX( this, 74 ), -1;
    if ( this.a ) return $SX( this, 71 ), -1;
    $Sjb( this, a, this.random(), 0, d );
    $Spb( this, d ? 0 : 1 );
    return this.U( this.a.id, null, 1, null, 4 )
  }
  console.log( "call is not set up, user setupVoiceCall or setupVideoCall first" )
};
$S.answer = function ( a ) {
  if ( !this.a ) return -1;
  this.a.video && a || ( this.a.video = 0 );
  this.a.ja = 1;
  this.a.sa = $Sy();
  this.a.yc = this.a.sa;
  a = 0;
  if ( this.a.kb ) a = this.U( this.a.id, null, 5, null, 0 );
  else if ( this.a.oc = 1, 0 != $Sqb( this, null ) ) return this.U( this.a.id, null, 72, null, 0 ), $S_( this, 72 ), 0;
  $S0( this, 1, 0, 1, this.a.video ? 0 : 1 );
  return a
};

function $Sbb( a, d, e, f ) {
  if ( !a.a || !a.a ) return -1;
  var h = e;
  a.a.Vb = f;
  0 > e && ( e = 65, 1 == a.a.mode && ( e = 67 ), a.a.ja && ( e = 64 ) );
  d = a.U( d, null, e, null, 0 );
  $S_( a, 0 < h ? h : 64 );
  return d
}
$S.R = function ( a ) {
  return $Sbb( this, a, -1, 1 )
};

function $S0( a, d, e, f, h ) {
  if ( !a.a ) return -1;
  if ( !a.a.ja ) return 0;
  0 == e && d && ( a.a.qb || a.a.S ) && ( d = 0 );
  0 == h && f && ( a.a.Qb || a.a.S ) && ( f = 0 );
  a.a.w && ( d && ( a.a.dd = e ), f && ( a.a.gd = h ), a.a.w.da( d, e, f, h ) );
  return 0
}
$S.da = function ( a, d, e ) {
  if ( !this.a ) return -1;
  if ( !a && !d ) return 0;
  var f = 0;
  a && ( f |= 1 );
  d && ( f |= 2 );
  this.U( this.a.id, null, e ? 9 : 10, null, f );
  a && ( this.a.qb = e );
  d && ( this.a.Qb = e );
  return $S0( this, a, e, d, e )
};
$S.xe = function () {
  this.da( !0, !1, !this.a.qb );
  return this.a.qb
};
$S.ze = function () {
  this.da( !1, !0, !this.a.Qb );
  return this.a.Qb
};

function $Srb( a, d ) {
  if ( !a.a ) return -1;
  if ( !a.a.ja ) return $Sbb( a, 0, -1, 0 ), 0;
  var e = 11;
  d || ( e = 12 );
  var f = 1;
  d && a.a.S & 5 && ( f = 0 );
  d || a.a.S & 5 || ( f = 0 );
  a.a.S = d ? a.a.S | 1 : a.a.S & -2;
  f && a.U( 0, null, e, null, 0 );
  $S0( a, 1, d, 1, d );
  if ( 12 == e && a.a.S ) return 0;
  $SX( a, e );
  return 0
}
$S.S = function ( a ) {
  return $Srb( this, a )
};

function $SY( a, d ) {
  a.G && clearTimeout( a.G );
  0 >= d || ( a.G = setTimeout( function () {
    a: if ( a.a && ( a.G = null, !a.a.ec || !a.a.ja ) ) {
      var e = 0;
      var f = $Sy();
      if ( !a.a.ec && 3 == a.a.Ua && ( e = $SA( f, a.a.sa, a.m.we ), 0 == e ) ) {
        $S_( a, 98 );
        break a
      }
      if ( a.a.ja && 3 == a.a.Ua ) $SY( a, e );
      else {
        0 < a.a.gb && ( a.a.ia = $SA( f, a.a.gb, 3E4 ), 0 == a.a.ia ? a.a.gb = 0 : 1500 < a.a.ia && ( a.a.ia = 1500 ) );
        var h = {};
        f = 0 == a.a.mode ? $Ssb( a, h ) : $Stb( a, h );
        h = h.status;
        0 < h ? $S_( a, h ) : 0 < e && ( 0 < f && e < f || 0 == f ) ? $SY( a, e ) : $SY( a, f )
      }
    }
  }, d ) )
}

function $Ssb( a, d ) {
  d.status = -1;
  var e = $Sy();
  if ( 1 == a.a.state ) {
    e = $SA( e, a.a.pc, a.a.timeout );
    if ( 0 == e ) {
      if ( a.a.ia ) return a.a.ia;
      d.status = 68;
      return 0
    }
    return e
  }
  return 0 == $SA( e, a.a.td, a.m.Wa ) && 0 == a.a.ia ? ( d.status = 66, 0 ) : 2 == a.a.state ? ( e = $SA( e, a.a.Dc, a.a.timeout ), 0 == e ? ( a.U( a.a.id, null, 6, null, 0 ), a.a.timeout ) : e ) : a.a.ia
}

function $Stb( a, d ) {
  d.status = -1;
  var e = $Sy();
  if ( a.a.ia ) return a.a.ia;
  if ( 1 == a.a.state ) return a = $SA( e, a.a.pc, a.a.timeout ), 0 == a ? ( d.status = 68, 0 ) : a;
  if ( 0 == $SA( e, a.a.td, a.m.Wa ) ) return d.status = 65, 0;
  a = $SA( e, a.a.jc, 2 * a.a.timeout );
  0 == a && ( d.status = 98 );
  return a
}

function $Spb( a, d ) {
  if ( a.a.w ) return 0;
  if ( !$Snb( a ) || !a.Cb ) return -1;
  a.a.w = a.w;
  if ( !a.a.w ) return -1;
  a.a.w.notify = a;
  var e = 1;
  a.a.video && ( e |= 2 );
  d && ( e |= 16, a.a.dd = 1, a.a.video && ( e |= 64, a.a.gd = 1 ) );
  a.a.w.flags = e;
  return 0
}

function $Sqb( a, d ) {
  a.a.kb = 1;
  a.a.Ic = 0;
  d && 0 != d.length ? ( a.a.w.answer( 0, d, a.a.video ), a.a.Tc = 0 ) : ( a.a.Tc = 1, a.a.Ic = 1, 0 < a.a.Vc || ( a.a.Vc = $Sy(), a.a.w.call( a.a.video ) ) );
  return 0
}

function $Sub( a ) {
  return a.groupid ? "g:" + a.groupid : "a:" + a.address
}

function $S_a( a ) {
  a.P.sort( function ( d, e ) {
    return d.ts < e.ts ? 1 : d.ts > e.ts ? -1 : 0
  } )
}

function $SW( a, d ) {
  if ( a.db && ( d.groupid = $SE( d.groupid ), "" != d.address || 0 != d.groupid ) ) {
    var e = {};
    e.address = d.address;
    e.groupid = d.groupid;
    e.picture = d.picture;
    e.name = d.name;
    e.lastMessage = d.lastMessage;
    e.ts = d.ts;
    e.picture == a.Cc && ( e.picture = "" );
    e.name == e.address && ( e.name = "" );
    a.db && $SRa( a.db, e )
  }
}
$S.od = function ( a ) {
  a.groupid = $SE( a.groupid );
  if ( 0 < a.groupid || $SB( a.address ) ) a.address = "";
  if ( 0 == a.groupid && "" == a.address ) return !1;
  a.ts = 0;
  a: {
    $SB( a.address ) && ( a.address = "" );$SB( a.groupid ) && ( a.groupid = 0 );$SB( a.name ) && ( a.name = "" );$SB( a.picture ) && ( a.picture = "" );$SB( a.lastMessage ) && ( a.lastMessage = null );$SB( a.ts ) && ( a.ts = 0 );a.groupid = $SE( a.groupid );
    var d = $Sub( a ),
      e = this.Ja[ d ];
    if ( e ) {
      e.name = a.name;
      e.picture = a.picture;
      var f = 1;
      a.ts > e.ts && ( e.ts = a.ts, f = 1 );
      if ( !f ) break a
    } else e = a;this.Ja[ d ] = e;$SW( this, e )
  }
  return a
};
$S.Za = function ( a, d ) {
  0 < d && ( a = "" );
  a = {
    address: a,
    groupid: d
  };
  ( d = this.Ja[ $Sub( a ) ] ) || ( d = this.od( a ) );
  $SB( d.picture ) && ( d.picture = this.Cc );
  $SB( d.name ) && ( d.name = d.groupid ? "Group " + d.groupid : d.address );
  return d
};

function $S4a( a, d, e ) {
  var f = a.Za( d, e ),
    h = 0;
  a.db.read( d, e, 0, 1, function ( l ) {
    if ( l ) f.ts = l.ts, f.lastMessage = l, f.lastMessage.date = $SD( f.ts ), $SW( a, f ), h++;
    else {
      if ( 0 == h )
        for ( f.ts = 0, f.lastMessage = null, l = 0; l < a.P.length; l++ )
          if ( 0 < f.groupid && a.P[ l ].groupid == f.groupid || f.address == a.P[ l ].address ) {
            a.P.splice( l, 1 )[ 0 ];
            break
          } $S_a( a )
    }
  } )
}

function $Svb( a, d ) {
  for ( var e = 0; e < a.Da.length; e++ )
    if ( a.Da[ e ] == d ) return;
  a.Da.push( d )
}

function $S1( a, d, e, f, h ) {
  this.h = a;
  this.id = this.h.random();
  this.address = d;
  this.ya = $SE( e );
  0 < this.ya && ( this.address = "" );
  this.Aa = h;
  this.Ib = null;
  this.Lb = !1;
  this.ud = this.Mb = 0;
  this.I = [];
  this.reset();
  d || e || f || ( this.summary = !0 )
}
$S = $S1.prototype;
$S.reset = function () {
  this.position = 0;
  this.I.length = 0;
  this.summary = this.Fa = this.end = !1;
  this.ba = null;
  this.Mc = this.Nc = 0;
  this.Ib = null
};
$S.stop = function () {
  $Swb( this.h, this, !1 );
  this.Fa && this.Tb( !1 );
  this.reset();
  this.h.sc == this && ( this.h.sc = null )
};
$S.Tb = function ( a, d ) {
  ( this.Fa = a ) && d && this.ba && $S1a( this, this.ba )
};
$S.Kd = function ( a ) {
  this.Fa = !1;
  this.summary = a;
  this.h.sc = this
};

function $S1a( a, d ) {
  !a.Fa || !d || 18 != d.status || d.ts < a.Nc || 0 < d.groupid || !( d.flag & 2 ) || 0 == d.id || ( a.Nc = d.ts, a.h.jd( {
    peer: d.peer,
    groupid: 0
  }, d.id ), a.ba = null )
}

function $S0a( a, d ) {
  return a.summary ? !1 : 0 < a.ya || 0 < d.groupid ? a.ya == d.groupid : a.address == d.peer
}
$S.read = function ( a ) {
  $Swb( this.h, this, !this.summary );
  0 == a && ( a = this.Mc );
  if ( this.end ) return this.Aa && this.Aa( 0 ), !1;
  if ( this.summary ) return this.I = this.h.P, this.Aa( this.h.P.length ), this.h.db && !this.h.db.ready && this.h.Da.push( this ), !0;
  if ( !this.h.db ) return this.Aa && this.Aa( 0 ), !0;
  this.Mc = a;
  if ( !this.h.db.ready ) return $Svb( this.h, this ), !0;
  var d = this;
  this.ba = null;
  this.Xb = 0;
  this.h.db.read( this.address, this.ya, this.position, a, function ( e ) {
    if ( null == e ) d.Xb || ( d.end = !0 ), $S1a( d, d.ba ), d.Aa && d.Aa( d.Xb );
    else {
      if ( !d.Mb ||
        d.Mb > e.ts ) d.Mb = e.ts, d.ud = e.id;
      e.origin = 1;
      var f = e.status;
      $SZa( d.h, e );
      if ( 18 == f && d.Fa ) {
        if ( !d.ba || e.wa > d.ba.wa ) d.ba = e;
        e.status = 19;
        $SU( d.h.db, e.id, e.peer, e.groupid, 19 );
        e.status = 18
      }
      d.position++;
      d.Xb++
    }
  } );
  return !0
};
$S.Bd = function ( a, d ) {
  var e = this.h;
  if ( e.Zb && !( e.$b & 4096 ) || this.Lb ) return !1;
  $Swb( this.h, this, !0 );
  this.Lb = !0;
  this.Ib = d;
  d = this.h.random();
  e = {};
  e.groupid = this.ya;
  e.channel = 0;
  e.type = this.summary ? 26 : 25;
  e.refid = this.ud;
  e.expiry = 3600;
  e.flag = 1028;
  e.peer = this.address;
  e.Z = this.id;
  e.vb = parseInt( this.Mb / 1E3 );
  e.count = a;
  this.summary && ( e.peer = "1", e.vb = 0 );
  this.h.M( e, d, " " )
};
$S.Rd = function () {
  return this.summary ? this.h.P : this.I
};
$S.Ya = function ( a ) {
  var d;
  for ( d = 0; d < this.I.length; d++ )
    if ( this.I[ d ].id == a ) {
      this.I.splice( d, 1 );
      break
    }
};
$S.tb = function ( a ) {
  for ( var d in a ) this.Ya( a[ d ] )
};
window.ReadSession = $S1;
$S1.prototype.enableReadReceipt = $S1.prototype.Tb;
$S1.prototype.enableSummary = $S1.prototype.Kd;
$S1.prototype.read = $S1.prototype.read;
$S1.prototype.sync = $S1.prototype.Bd;
$S1.prototype.reset = $S1.prototype.reset;
$S1.prototype.stop = $S1.prototype.stop;
$S1.prototype.deleteMessage = $S1.prototype.Ya;
$S1.prototype.deleteMessages = $S1.prototype.tb;
$S1.prototype.getMessages = $S1.prototype.Rd;

function $SV() {
  this.Nb = this.uid = 0;
  this.Pb = "";
  this.yd = "javascript";
  this.db = null;
  this.W = "mesibo";
  this.A = null;
  this.Da = [];
  this.sc = null;
  this.Zb = this.pa = this.ra = 0;
  this.Kc = 3E4;
  this.Hc = 50;
  this.wc = 0;
  this.ac = 604800;
  this.stopped = this.N = this.Gc = this.$b = 0;
  this.j = new $Sqa;
  this.Bb = -1;
  this.notify = null;
  this.l = {};
  this.ab = {};
  this.la = null;
  this.cb = 0;
  this.Na = -1;
  this.g = 15E3;
  this.hb = 0;
  this.Sc = this.ca = null;
  this.$c = new $SJ;
  this.Nd = parseInt( Math.floor( 65535 * Math.random() ), 10 );
  this.Rc = {};
  this.P = [];
  this.Ja = {};
  this.Cc = "";
  this.ma = [];
  this.m = {};
  this.m.mb = 6E4;
  this.m.Wa = 6E4;
  this.m.wd = 15E3;
  this.m.Ob = 7500;
  this.m.we = 6E4;
  this.m.Ed = 0;
  this.m.Qe = 1;
  this.m.cf = null;
  this.m.Ye = null;
  this.m.tc = 0;
  this.m.Xe = null;
  this.uc = this.m.We = 0;
  $SZ( this );
  this.fd = 0;
  this.Cb = !0;
  this.xa = -1;
  this.aa = null
}

function $Sxb() {}

function $Syb( a, d, e ) {
  null != a && $Sx( a, "Mesibo_OnConnectionStatus" ) && a.Mesibo_OnConnectionStatus( d, e )
}

function $S2 ( a, d, e ) {
  if ( d != a.xa ) {
    $Syb( a.notify, d, e );
    for ( var f in a.l ) $Syb( a.l[ f ], d, e );
    a.xa = d
  }
}

function $Szb ( a, d ) {
  var e = a.notify;
  void 0 != d && null != d && d.hasOwnProperty( "channel" ) && 0 < d.channel && ( d = d.channel, a.l.hasOwnProperty( d ) && ( e = a.l[ d ] ) );
  return e
}

function $S3 ( a, d ) {
  var e = !0;
  !0 === e ? e = $Sxb : void 0 === e && ( e = null );
  return ( a = $Szb( a, null ) ) && $Sx( a, d ) ? a[ d ] : e
}

function $SAb ( a, d ) {
  0 < d.groupid && ( d.address = "" );
  var e = d,
    f = e.id,
    h = e.status,
    l = a.Rc[ f ];
  if ( l ) {
    e = l;
    if ( 3 == h )
      for ( f in a.ma ) {
        l = a.ma[ f ];
        var m = e;
        if ( $S0a( l, m ) ) {
          for ( var v = l.I.length - 1; 0 <= v; ) {
            if ( l.I[ v ].id == m.id ) {
              l.I[ v ].status = 3;
              $SU( l.h.db, m.id, m.peer, m.groupid, 3 );
              break
            }
            v--
          }
          if ( !( 0 >= v ) )
            for ( v--; 0 <= v && 2 == l.I[ v ].status; ) l.I[ v ].status = 3, $SU( l.h.db, l.I[ v ].id, m.peer, m.groupid, 3 ), v--
        }
      }
    e.status = h
  } ( l = a.Za( e.peer, e.groupid ) ) && l.lastMessage && l.lastMessage.id == f && $SW( a, l );
  a.db && $SU( a.db, f, e.peer, e.groupid, h );
  a = $Szb( a, d );
  null !=
    a && $Sx( a, "Mesibo_OnMessageStatus" ) && a.Mesibo_OnMessageStatus( d )
}
$S = $SV.prototype;
$S.pd = function ( a ) {
  if ( 39 > a.length ) return !1;
  this.N = this.uid = 0;
  this.Pb = a;
  $S6a( this, this.Pb );
  if ( 0 == this.uid ) return !1;
  if ( 0 != this.uid )
    if ( this.storage = new $SXa( this.uid ), this.ib = this.storage.getItem( "r_server", "" ), this.vc = this.storage.getItem( "r_ports", "" ), this.ga = this.storage.getItem( "r_lic", "" ), this.b = this.storage.getItem( "r_expiry", 0 ), a = $Sz(), 0 < this.b && this.b > a ) {
      a = this.ga;
      for ( var d = [], e = 0; e < a.length; ) {
        var f = $SCa( a.charCodeAt( e++ ) ),
          h = $SCa( a.charCodeAt( e++ ) );
        d.push( 16 * f + h )
      }
      this.ga = d
    } else this.b = 0, this.ga =
      "";
  return !0
};
$S.xb = function () {
  return this.uid
};
$S.Pd = function () {
  return this.xa
};
$S.rc = function ( a, d ) {
  void 0 != d && 0 < d ? this.l[ d ] = a : this.notify = a
};
$S.nd = function ( a ) {
  this.yd = a
};
$S.qc = function () {
  var a = $Sz(),
    d = "rtc.voicephp.com";
  0 < this.b && this.b > a ? d = this.ib : ( this.b = 0, this.ga = "" );
  this.j.qc( 1, d, 5443 )
};

function $SBb ( a, d, e ) {
  "indexedDB" in window ? ( a.db = new $SKa, a.db && a.db.open( d, function ( f ) {
    f ? $STa( a.db, function ( h ) {
      console.log( "ttt" );
      console.log( h );
      a.Ja = {};
      for ( var l = 0; l < h.length; l++ ) {
        var m = h[ l ];
        m.ts && ( a.P.push( m ), m.lastMessage.date = $SD( m.ts ) );
        a.Ja[ $Sub( m ) ] = m
      }
      $S_a( a );
      e();
      a.A && a.A( !0 )
    } ) : ( console.log( "opening db " + d + " failed" ), a.db = null, e( null ), a.A && a.A( !1 ) )
  } ) ) : e( null )
}
$S.ne = function ( a, d ) {
  this.W = a;
  void 0 !== d && ( this.A = d )
};

function $Swb ( a, d, e ) {
  e ? a.ma[ d.id ] = d : a.ma.hasOwnProperty( d.id ) && delete a.ma[ d.id ]
}
$S.fe = function ( a, d, e, f ) {
  console.log( this );
  void 0 === a || null == a ? a = "" : a = a.trim();
  return new $S1( this, a, d, e, f )
};
$S.start = function () {
  if ( 0 == this.uid ) return $S2( this, 4, 0 ), !1;
  this.stopped = 0;
  this.j.$ = this;
  if ( this.W && 0 < this.W.length ) {
    var a = this;
    $SBb( this, this.W, function () {
      for ( a.j.start(); 0 < a.Da.length; ) a.Da.shift().read( 0 ), console.log( "ps len " + a.Da.length )
    } );
    return 0
  }
  this.j.start();
  return !0
};
$S.stop = function () {
  this.stopped = 1;
  this.j.stop()
};
$S.random = function () {
  return parseInt( Math.floor( 2147483647 * Math.random() ) )
};

function $Sua ( a ) {
  a.qc();
  $S2( a, 6, 0 )
}
$S.Eb = function () {
  this.pa = 0;
  this.zd = $Sy();
  0 == this.uid && $S6a( this, this.Pb );
  if ( 0 == this.uid ) this.N = 1;
  else {
    var a = new $SK( 0 );
    a.D = 1;
    a.result = 1;
    a.id = 1433999274;
    $SP( a, 3, this.Nb, 4 );
    $SP( a, 6, 1, 1 );
    this.send( a )
  }
};
$S.bc = function () {
  3600 < this.b && ( this.b -= 3600, this.storage.setItem( "r_expiry", this.b ) )
};
$S.Db = function () {
  $SCb( this );
  return this.N || this.stopped ? 0 : 1
};
$S.cc = function ( a ) {
  var d = new $SK( 1 );
  $SL( d, a.data, a.data.byteLength );
  0 == d.b && $SEa( d );
  a = d.result;
  switch ( a ) {
    case 65:
      for ( this.ra = d.wb(); ; ) {
        var e = $SN( d, 0 );
        if ( null == e || 0 >= e.length ) break;
        var f = {},
          h = 0,
          l = null;
        f.groupid = 0;
        f.peer = "";
        f.id = 0;
        f.type = 0;
        f.channel = 0;
        f.ts = $Sy();
        f.Z = 0;
        for ( var m in e ) {
          var v = e[ m ],
            w = v.val,
            x = v.data,
            D = v.len;
          v = parseInt( v.type, 10 );
          if ( 1 != v ) switch ( v ) {
            case 3:
              f.id = $SH( x, x.byteLength );
              break;
            case 13:
              f.refid = $SH( x, x.byteLength );
              break;
            case 29:
              f.Z = $SH( x, x.byteLength );
              break;
            case 30:
              f.count = w;
              break;
            case 19:
              f.vb =
                $SH( x, x.byteLength );
              break;
            case 6:
              f.groupid = w;
              f.gid = w;
              break;
            case 5:
              h = w;
              break;
            case 4:
              l = $SI( x, 0, x.byteLength );
              f.peer = l;
              break;
            case 7:
              f.message = x;
              f.mlen = D;
              break;
            case 16:
              f.ts = $Sy() - 1E3 * w;
              break;
            case 9:
              f.flag = w;
              break;
            case 10:
              f.channel = w;
              break;
            case 11:
              f.type = w;
              break;
            case 12:
              f.status = w
          }
        }
        0 < h && null != l ? ( this.la = this.ab[ h ] = l, this.cb = h ) : 0 < h ? ( this.ab.hasOwnProperty( h ) ? this.la = l = this.ab[ h ] : l = this.la, this.cb = h, f.peer = l ) : f.peer = this.la;
        f.origin = 0;
        if ( !f.Z && f.hasOwnProperty( "status" ) ) e = f, !this.a || 0 == e.id || 128 != e.channel ||
          !this.a || e.refid && this.a.id != e.refid ? e = -1 : ( e.status & 128 ? $S_( this, 98 ) : ( 2 == e.status && ( this.a.gb = 0, this.a.Dc = $Sy(), this.a.state = 2, this.a.timeout = this.m.Ob ), 1 == e.status && 0 == this.a.ic && $SX( this, 2 ) ), e = 0 ), 0 != e && $SAb( this, f );
        else if ( f.hasOwnProperty( "message" ) ) {
          f.hasOwnProperty( "channel" ) || ( f.channel = 0 );
          f.hasOwnProperty( "id" ) || ( f.id = 0 );
          f.data = f.message;
          f.datalen = f.mlen;
          if ( 256 & parseInt( f.flag ) && ( e = void 0, h = f, l = f.message, w = f.mlen, x = new $SK( 1 ), $SL( x, l, w ), l = $SN( x, 1 ), h.message = "", h.mlen = 0, !( null == l || 0 >= l.length ) ) )
            for ( e in l ) switch ( w =
              l[ e ], x = w.val, D = w.data, v = w.len, parseInt( w.type, 10 ) ) {
                case 1:
                  try {
                    h.title = ( new TextDecoder( "utf-8" ) ).decode( D.slice( 0, D.byteLength - 1 ) )
                  } catch ( M ) {
                    h.title = ""
                  }
                  break;
                case 3:
                  h.launchurl = $SI( D, 0, D.byteLength - 1 );
                  break;
                case 6:
                  x = $SH( D, D.byteLength );
                  w = ( x & 4294967295 ) / 11930400 - 180;
                  x = ( x >> 64 ) / 11930400 - 90;
                  h.lat = x;
                  h.lon = w;
                  break;
                case 16:
                  h.filetype = x;
                  break;
                case 17:
                  h.filesize = x;
                  break;
                case 18:
                  h.fileflags = x;
                  break;
                case 19:
                  h.fileurl = $SI( D, 0, D.byteLength - 1 );
                  break;
                case 4:
                  h.tn = D;
                  break;
                case 20:
                  h.rrid = $SH( D, 4 < D.byteLength ? 4 : D.byteLength );
                  break;
                case 2:
                  h.message = D.slice( 0, v - 1 );
                  h.mlen = v - 1;
                  break;
                case 21:
                  h.presence = x
              }
          if ( 0 < f.mlen ) try {
            f.message = ( new TextDecoder( "utf-8" ) ).decode( f.message )
          } catch ( M ) {
            f.message = ""
          }
          if ( f.hasOwnProperty( "rrid" ) ) f.status = 3, f.id = f.rrid, f.rrid = 0, $SAb( this, f );
          else if ( 0 == ( f.flag & 16 ) ) {
            if ( 4294967295 > parseInt( f.id ) && 0 < parseInt( f.id ) && ( !f.Z || 18 == f.status || 19 == f.status ) ) {
              e = f;
              h = f.id;
              l = this.cb;
              w = [];
              for ( D = x = 0; 4 > D; D++ ) w[ x++ ] = h & 255, h >>>= 8;
              for ( D = 0; 4 > D && ( w[ x++ ] = l & 255, l >>>= 8, 0 != l ); D++ );
              l = w;
              w = 0;
              x = [];
              for ( h = 0; h < l.length; h++ ) x[ w++ ] =
                l[ h ] & 15, x[ w++ ] = l[ h ] >> 4 & 15;
              h = $Sxa( x, 16, 10 );
              e.id = h
            }
            if ( f.flag & 512 ) a: {
              e = void 0; l = f.data; w = f.datalen; h = {
                lb: 0,
                s: 0
              }; x = new $SK( 1 ); $SL( x, l, w ); l = $SN( x, 1 );
              if ( null == l || 0 >= l.length ) e = null;
              else {
                for ( e in l ) switch ( w = l[ e ], x = w.val, D = w.data, parseInt( w.type, 10 ) ) {
                  case 1:
                    h.id = $SH( D, D.byteLength ) & 4294967295;
                    break;
                  case 2:
                    h.status = x;
                    break;
                  case 3:
                    h.type = x;
                    break;
                  case 4:
                    h.s = x;
                    break;
                  case 7:
                    h.lb = x;
                    break;
                  case 8:
                    h.Wa = x;
                    break;
                  case 9:
                    h.mb = x;
                    break;
                  case 5:
                    h.sdp = $SI( D, 0, D.byteLength ), h.ie = h.sdp.length
                }
                0 == h.lb && ( h.lb = 6E4 );
                e = h
              }
              h = f.peer;
              this.a && ( this.a.gb = 0 );
              if ( 1 != e.status ) {
                if ( !this.a ) {
                  if ( e.status & 64 ) break a;
                  $Smb( this, e.id, 65 );
                  break a
                }
                if ( 0 != this.a.ta.localeCompare( h ) ) break a
              }
              1 == e.status ? this.a || 0 < this.uc ? ( f = 67, 0 < this.uc && ( f = this.uc ), $Smb( this, e.id, f ) ) : parseInt( $Sy() - f.ts ) > e.mb || ( $Sjb( this, h, e.id, 1, e.s & 2 ? 1 : 0 ), this.a.jc = $Sy(), this.a.Fd = e.s, this.a.callee = 1, this.U( this.a.id, h, 3, null, e.s & 4 ), $Skb( this, this.a.id, 1 ), 0 != $Spb( this, 0 ) && $S_( this, 72 ) ) : ( 0 < e.ie && ( this.a.Ua |= 2, this.a.sa = $Sy() ), this.a.jc = $Sy(), 3 == e.status ? this.a.bd = 1 : 5 == e.status &&
                ( this.a.sa = $Sy(), this.a.yc = this.a.sa, this.a.ja = 1, $S0( this, 1, e.s & 1 ? 0 : 1, 1, e.s & 2 ? 0 : 1 ) ), 5 != e.status || this.a.kb || 0 == $Sqb( this, e.sdp ) ? 8 == e.status ? this.a.kb ? $Sib( this.a.w, e.sdp ) : 0 != $Sqb( this, e.sdp ) && ( this.U( this.a.id, h, 72, null, 0 ), $S_( this, 72 ) ) : ( 11 == e.status ? ( this.a.S |= 2, $S0( this, 1, 1, 1, 1 ) ) : 12 == e.status && ( this.a.S &= -3, $S0( this, 1, 0, 1, 0 ) ), 12 == e.status && this.a.S || 6 == e.status || ( $Skb( this, this.a.id, e.status ), e.status & 64 && $S_( this, -1 ) ) ) : $S_( this, 72 ) )
            }
            else if ( h = void 0, e = f, f = f.message, e.Z || ( e.status = 18 ), $SZa( this,
              e ), e.Z ) {
              if ( e.flag & 8388608 )
                for ( h in this.ma )
                  if ( h == e.Z ) {
                    f = this.ma[ h ];
                    h = e.count;
                    e = e.flag;
                    0 < h && ( f.end = !1 );
                    f.Lb = !1;
                    e & 67108864 && ( f.Lb = !0 );
                    f.Ib && f.Ib( h );
                    break
                  }
            } else h = $Szb( this, e ), null != h && $Sx( h, "Mesibo_OnMessage" ) && h.Mesibo_OnMessage( e, f )
          }
        }
      }
      break;
    case 79:
      $S2( this, 3, 0 );
      this.stop();
      break;
    case 5:
      var F = d;
      $SN( F, 0 );
      $S7a( this, this.uid, F.wb(), this.cookie, F.map[ 10 ].data, this.yd );
      F = null;
      null != F && this.send( F );
      return
  }
  if ( a & 128 ) {
    $S4( this );
    if ( 145 == a ) {
      F = $SN( d, 0 );
      if ( !( null == F || 0 >= F.length ) ) {
        for ( var y in F ) switch ( d = F[ y ],
          a = d.val, m = d.data, parseInt( d.type, 10 ) ) {
            case 7:
              this.ib = $SI( m, 0, m.byteLength - 1 );
              break;
            case 8:
              this.vc = $SI( m, 0, m.byteLength - 1 );
              break;
            case 3:
              this.b = $Sz() + a;
              break;
            case 4:
              this.ga = m.slice( 0 )
          }
        F = this.ga;
        y = this.ga.byteLength;
        d = [];
        for ( a = 0; a < 0 + y; a++ ) d.push( ( F[ a ] >>> 4 ).toString( 16 ) ), d.push( ( F[ a ] & 15 ).toString( 16 ) );
        F = d.join( "" );
        this.storage.setItem( "r_server", this.ib );
        this.storage.setItem( "r_ports", this.vc );
        this.storage.setItem( "r_lic", F );
        this.storage.setItem( "r_expiry", this.b )
      }
      this.j.disconnect();
      this.j.start();
      return
    }
    if ( 192 ==
      ( a & 192 ) ) {
      $S2( this, 4, 0 );
      this.pa = 0;
      this.N = 1;
      this.j.stop();
      return
    }
  }
  if ( 0 == ( a & 64 ) ) {
    $S4( this );
    0 == d.b && $SEa( d );
    y = d.D;
    if ( 1 == y ) {
      if ( 0 == a ) {
        this.g = 5 * ( $Sy() - this.zd );
        5E3 > this.g ? this.g = 5E3 : 3E4 < this.g && ( this.g = 3E4 );
        this.pa = 1;
        this.Zb++;
        y = $SN( d, 0 );
        if ( !( null == y || 0 >= y.length ) )
          for ( F in y )
            if ( a = y[ F ], d = a.val, a = parseInt( a.type, 10 ), 1 != a ) switch ( a ) {
              case 5:
                this.Kc = 1E3 * d;
                break;
              case 6:
                this.Hc = 20 * d;
                break;
              case 11:
                this.wc = d;
                break;
              case 13:
                this.ac = d;
                break;
              case 8:
                this.$b = d
            }
        $S8a( this );
        $S2( this, 1, this.wc );
        this.hb = 0;
        this.ca = null;
        $SYa( this )
      }
    } else 2 ==
      y && null != this.ca && ( F = {
        status: 1
      }, F.id = this.ca.bb, F.groupid = this.ca.Ka, F.peer = "", 0 == F.groupid && ( F.peer = this.ca.Ub() ), $SAb( this, F ) );
    this.hb = 0;
    $S2a( this )
  }
  this.ra && $S8a( this )
};

function $SCb ( a ) {
  $S$a( a );
  $S4( a );
  a.hb = 0;
  a.ca = null;
  $S2( a, 2, 0 )
}
$S.send = function ( a ) {
  this.pa && 0 < this.ra && ( $SDa( a, this.ra ), this.ra = 0 );
  if ( !this.j ) return 0;
  if ( 0 != a.mode ) a = null;
  else {
    var d = 0;
    a.buffer[ d++ ] = a.D;
    a.buffer[ d++ ] = a.result;
    var e = a.C - 8;
    a.buffer[ d++ ] = e & 255;
    a.buffer[ d++ ] = e >> 8 & 255;
    $SDa( a, a.id );
    a = a.buffer.slice( 0, a.C )
  }
  this.hb = 1;
  this.j.send( a );
  this.pa && $S8a( this );
  $SDb( this )
};

function $SDb ( a ) {
  $S4( a );
  a.Na = setTimeout( function () {
    console.log( "_response_timeout" );
    a.j.disconnect();
    $SCb( a );
    a.j.start()
  }, a.g )
}

function $S4 ( a ) {
  -1 != a.Na && clearInterval( a.Na );
  a.Na = -1
}
$S.$d = function () {
  if ( this.aa ) return this.aa;
  $Sob( this );
  return this.aa = new $S5( this )
};
window.performance = window.performance || {};
performance.now = performance.now || performance.b || performance.g || performance.l || performance.webkitNow || Date.now;
window.mesibo_exports = function () {
  var a = new $SV;
  a.nd( "web" );
  a.rc( null );
  a.pd( null );
  a.start();
  0( null, null, null );
  a.Ee().Tb( !0 )
};
window.Mesibo = $SV;
$SV.prototype.start = $SV.prototype.start;
$SV.prototype.stop = $SV.prototype.stop;
$SV.prototype.setDatabase = $SV.prototype.ne;
$SV.prototype.readDbSession = $SV.prototype.fe;
$SV.prototype.setListener = $SV.prototype.rc;
$SV.prototype.setAppName = $SV.prototype.nd;
$SV.prototype.setCredentials = $SV.prototype.pd;
$SV.prototype.getUid = $SV.prototype.xb;
$SV.prototype.getConnectionStatus = $SV.prototype.Pd;
$SV.prototype.sendMessage = $SV.prototype.M;
$SV.prototype.forwardMessage = $SV.prototype.Md;
$SV.prototype.deleteMessage = $SV.prototype.Ya;
$SV.prototype.deleteMessages = $SV.prototype.tb;
$SV.prototype.resendMessage = $SV.prototype.ge;
$SV.prototype.sendFile = $SV.prototype.ke;
$SV.prototype.sendPresence = $SV.prototype.le;
$SV.prototype.sendReadReceipt = $SV.prototype.jd;
$SV.prototype.setupVoiceCall = $SV.prototype.se;
$SV.prototype.setupVideoCall = $SV.prototype.re;
$SV.prototype.call = $SV.prototype.call;
$SV.prototype.mute = $SV.prototype.da;
$SV.prototype.toggleAudioMute = $SV.prototype.xe;
$SV.prototype.toggleVideoMute = $SV.prototype.ze;
$SV.prototype.answer = $SV.prototype.answer;
$SV.prototype.hangup = $SV.prototype.R;
$SV.prototype.random = $SV.prototype.random;
$SV.prototype.setContact = $SV.prototype.od;
$SV.prototype.getContact = $SV.prototype.Za;
$SV.prototype.initGroupCall = $SV.prototype.$d;
$SV.prototype.time_msec = $Sy;
$SV.prototype.time_sec = $Sz;
$SV.prototype.convertTimestamp = $SD;
window.array2String = $SI;
"https:" != window.location.protocol && window.location.host.replace( /(localhost|127\.0\.0\.1)(:\d+)?/i, "" ) && ( console.error( "*** WARNING: mesibo requires secure(https) connection ***" ), console.error( "*** Detected host: " + window.location.host ) );

function $SEb ( a, d, e, f ) {
  switch ( d ) {
    case 3:
      a.type = e;
      break;
    case 5:
      a.sdp = $SI( f, 0, f.byteLength );
      break;
    case 7:
      a.mid = $SI( f, 0, f.byteLength );
      break;
    case 6:
      a.Te = e
  }
}

function $SFb ( a, d, e ) {
  switch ( d ) {
    case 3:
      a.width = e;
      break;
    case 4:
      a.height = e;
      break;
    case 5:
      a.rate = e;
      break;
    case 6:
      a.flags = e;
      break;
    case 7:
      a.codecs = e;
      break;
    case 8:
      a.B = e;
      break;
    case 13:
      a.Xa = e;
      break;
    case 9:
      a.xd = e;
      break;
    case 10:
      a.ve = e;
      break;
    case 11:
      a.hd = e;
      break;
    case 12:
      a.c = e
  }
}

function $SGb ( a, d, e, f ) {
  switch ( d ) {
    case 4:
      a.uid = e;
      break;
    case 7:
      a.ta = e;
      break;
    case 6:
      a.va = e;
      break;
    case 5:
      a.Ka = e;
      break;
    case 9:
      a.flags = e;
      break;
    case 10:
      a.codecs = e;
      break;
    case 14:
      a.Sa = e;
      break;
    case 15:
      a.ff = e;
      break;
    case 11:
      a.Ea = e;
      break;
    case 12:
      a.Rb = e;
      break;
    case 16:
      a.ae = e;
      break;
    case 17:
      a.role = e;
      break;
    case 13:
      a.name = $SI( f, 0, f.byteLength );
      break;
    case 8:
      a.address = $SI( f, 0, f.byteLength )
  }
}

function $S6 ( a, d, e, f ) {
  switch ( d ) {
    case 5:
      a.id = $SH( f, f.byteLength );
      break;
    case 3:
      a.D = e;
      break;
    case 19:
      a.error = e
  }
}

function $S7 ( a ) {
  var d = new $SK( 0 );
  $SP( d, 1, 1, 2 );
  $SP( d, 3, a.D, 2 );
  $SP( d, 5, a.id, 2 );
  void 0 != a.wa && 0 < a.wa && $SP( d, 10, a.wa, 8 );
  if ( void 0 != a.p && null != a.p ) {
    var e = a.p;
    $SP( d, 20, 1, 1 );
    $SP( d, 7, e.ta, 1 );
    $SP( d, 11, e.Ea, 1 );
    $SQ( d, 6, e.va );
    $SQ( d, 5, e.Ka );
    $SQ( d, 10, e.codecs );
    $SQ( d, 12, e.Ge );
    $SQ( d, 9, e.flags );
    $SQ( d, 16, e.ae );
    $SQ( d, 4, e.module );
    $SP( d, 30, 1, 1 )
  }
  void 0 != a.media && null != a.media && ( e = a.media, $SP( d, 21, 1, 1 ), $SQ( d, 3, e.width ), $SQ( d, 4, e.height ), $SQ( d, 5, e.rate ), $SQ( d, 6, e.flags ), $SQ( d, 7, e.codecs ), $SQ( d, 8, e.B ), $SQ( d, 13, e.Xa ), $SQ( d,
    9, e.xd ), $SQ( d, 10, e.ve ), $SQ( d, 11, e.hd ), $SQ( d, 12, e.c ), $SQ( d, 18, 5 ), e.xc && $SS( d, 17, e.xc ), $SP( d, 20, 1, 1 ) );
  void 0 != a.sdp && null != a.sdp && ( e = a.je, a = a.sdp, $SP( d, 23, 1, 1 ), $SQ( d, 3, e ), $SS( d, 5, a ), $SP( d, 10, 1, 1 ) );
  $SP( d, 2, 1, 1 );
  return $SM( d )
}

function $S8 ( a ) {
  this.X = a
}
$S8.prototype.b = function ( a ) {
  this.xa = a;
  var d = this.X,
    e = $Sy() - d.ue;
  1 == a && ( 2E3 < e ? $SHb( d ) : setTimeout( function () {
    $SHb( d )
  }, 2E3 - e ) )
};
$S8.prototype.l = function () { };
$S8.prototype.g = function ( a ) {
  a: {
    var d = this.X;
    if ( !( 0 < a.groupid && a.groupid != d.ua ) ) {
      var e = a.data,
        f = a.datalen,
        h = new $SK( 1 );
      $SL( h, e, f );
      e = $SN( h, 1 );
      f = {
        fc: []
      };
      if ( null == e || 0 >= e.length ) var l = void 0;
      else {
        var m = $S6;
        h = f;
        var v = 0;
        for ( l in e ) {
          var w = e[ l ],
            x = w.val,
            D = w.data,
            F = w.len;
          w = parseInt( w.type, 10 );
          if ( v || 20 != w )
            if ( 20 == v && 30 == w ) h.active = !1, h.role & 1 && ( h.active = !0 ), h.ea = !1, h.vd = !1, h.role & 256 && ( h.ea = !0, h.role & 4096 && ( h.vd = !0 ) ), h.audio = !1, h.video = !1, h.flags & 2 && ( h.audio = !0 ), h.flags & 4 && ( h.video = !0 ), void 0 == h.va && ( h.va = 0 ),
              void 0 == h.name && ( h.name = "" ), f.fc.push( h ), m = $S6, h = f, v = 0;
            else if ( v || 21 != w )
              if ( 21 == v && 20 == w ) void 0 == h.B && ( h.B = 0 ), m = $S6, f.media = h, h = f, v = 0;
              else if ( v || 23 != w )
                if ( 23 == v && 10 == w ) m = $S6, f.Ma = h, h = f, v = 0;
                else {
                  if ( 2 == w ) break;
                  m( h, w, x, D, F )
                }
              else v = w, m = $SEb, h = {};
            else v = w, m = $SFb, h = {};
          else v = w, m = $SGb, h = {}
        }
        l = f
      }
      if ( 0 < l.fc.length ) {
        e = l.fc;
        f = d.h.xb();
        h = 0;
        m = [];
        for ( var y in e )
          if ( v = e[ y ], D = v.uid, x = 4294967296 * v.va + v.uid, 0 < v.ta ) $S3( d.h, "Mesibo_OnSubscriber" )( v );
          else if ( D == f ) delete e[ y ];
          else if ( v.ea )
            if ( D = null, d.fa.hasOwnProperty( x ) &&
              ( D = d.fa[ x ] ), v.active ) {
              if ( D ) {
                if ( D.update( v ) ) {
                  $S3( d.h, "Mesibo_OnParticipantUpdated" )( d.fa, D );
                  continue
                }
                delete d.fa[ x ]
              }
              D = new $S9( d, v, !1 );
              d.fa[ x ] = D;
              m.push( D );
              h++
            } else D && D.H.Sa == v.Sa && ( D.R( !0 ), delete d.fa[ x ] );
        0 < m.length && $S3( d.h, "Mesibo_OnParticipants" )( d.fa, m );
        if ( 0 == l.id || void 0 == l.Y || 0 == l.Y ) break a
      }
      if ( !( 0 < a.groupid ) && ( a = a.refid, y = $So( d.oa, a, null ) ) )
        if ( 9 == l.D ) l = {
          D: 9
        }, l.id = y.Y, a = $S7( l ), d.M( y, a );
        else if ( y.Y != l.id && ( y.Y = l.id, d.oa[ l.id ] = y, delete d.oa[ a ] ), 2 == l.D ) a = d.cd, d = d.ad, y.na = l.media, y.B = y.na.B, y.v = y.v &&
          y.na.flags & 4 ? !0 : !1, y.u = y.u && y.na.flags & 2 ? !0 : !1, y.c = new $Sv( a, d ), y.media = {
            video: {
              source: y.source,
              B: y.na.B,
              send: y.v,
              F: !1
            },
            audio: {
              send: y.u,
              F: !1
            }
          }, y.media.jb = y.jb && y.na.flags & 512 ? !0 : !1, y.c.createOffer( y.media, y );
        else if ( 3 == l.D )
          if ( a = {}, a.sdp = l.Ma.sdp, 1 == l.Ma.type ) {
            a.type = "offer";
            if ( void 0 == y.c || null == y.c ) y.c = new $Sv( d.cd, d.ad );
            y.media = {
              video: {
                F: y.v,
                send: !1
              },
              audio: {
                F: y.u,
                send: !1
              }
            };
            y.c.createAnswer( y.media, a, y )
          } else if ( 2 == l.Ma.type ) a.type = "answer", y.c && y.c.pe( a ), l.media && $SIb( y, l.media );
          else {
            if ( 3 == l.Ma.type ) {
              d =
                null;
              if ( 20 < l.Ma.sdp.length ) try {
                d = JSON.parse( l.Ma.sdp )
              } catch ( M ) {
                break a
              }
              y.c.Pa( d )
            }
          } else 4 == l.D && ( console.log( "set" ), $SIb( y, l.media ) ), 19 == l.D && $S3( d.h, "Mesibo_OnError" )( l.error )
    }
  }
};
$S8.prototype.Mesibo_OnMessage = $S8.prototype.g;
$S8.prototype.Mesibo_OnMessageStatus = $S8.prototype.l;
$S8.prototype.Mesibo_OnConnectionStatus = $S8.prototype.b;

function $SJb ( a, d, e, f ) {
  f && ( a.Jb = !0 );
  a = {};
  var h = e.getVideoTracks()[ 0 ];
  f && ( e = new MediaStream, h && e.addTrack( h ) );
  if ( h ) try {
    var l = f = 0,
      m = 0,
      v = 0,
      w = h.getSettings();
    w && ( f = $So( w, "width", 0 ), l = $So( w, "height", 0 ), m = $So( w, "frameRate", 0 ), w.hasOwnProperty( "cursor" ) && ( v = 1 ), a.width = f, a.height = l, a.rate = m, a.screen = v )
  } catch ( x ) { }
  d.Qc = a;
  w = e;
  d.stream = w;
  w = w.getVideoTracks();
  null !== w && void 0 !== w && 0 < w.length && ( d.yb = !0 );
  d.J ? d.ob( d.J ) : d.hc && d.ob( d.hc );
  d.Wc( d )
}

function $S5 ( a ) {
  $Ska();
  this.ue = $Sy();
  this.h = a;
  this.oa = {};
  this.fa = {};
  this.cd = {};
  this.ua = 0;
  this.be = 5;
  this.Jb = !1;
  var d = this;
  this.ad = {
    K: function ( e, f ) {
      e = e.ka();
      e.Kb || e.R( !0 );
      console.error( "on error" );
      console.error( f )
    },
    L: function ( e, f ) {
      $S3( d.h, "Mesibo_OnPermission" )( f )
    },
    Hb: function ( e, f ) {
      e.ka().Kb = f;
      $S3( d.h, "Mesibo_OnLocalMedia" )( f )
    },
    de: function ( e, f ) {
      $S3( d.h, "Mesibo_OnConstraints" )( f )
    },
    dc: function () { },
    Gb: function ( e, f ) {
      e = e.ka();
      $SKb( e, f );
      e.ea && "completed" !== f && "connected" !== f ? e.Ca( e, 50 ) : "connected" === f && e.Ca( e,
        48 )
    },
    eb: function ( e, f, h ) {
      e = e.ka();
      h ? $SJb( d, e, f, !0 ) : e.Ca( e, 65 )
    },
    Ba: function ( e, f, h ) {
      h && $SJb( d, e.ka(), f, !1 )
    },
    Fb: function () {
      console.log( "on webrtc cleanup" )
    },
    Je: function () { },
    Ra: function ( e, f ) {
      e = e.ka();
      var h = 2;
      "offer" == f.type && ( h = 1 );
      $SLb( e, h, f.sdp )
    },
    Pa: function ( e, f ) {
      $SLb( e.ka(), 3, f ? f.candidate : "eoc" )
    },
    Sb: function () { },
    Re: this
  };
  this.h.rc( new $S8( this ), 144 );
  this.xa = a.xa;
  $Spa( function () {
    for ( var e in d.oa ) d.oa[ e ].R()
  } )
}
$S = $S5.prototype;
$S.qe = function ( a ) {
  void 0 == a || null == a ? this.ua = 0 : ( this.ua = a, 1 == this.xa && $SHb( this ) )
};
$S.Zd = function () {
  this.ua = 0
};

function $SHb ( a ) {
  if ( 0 != a.ua ) {
    var d = 0;
    for ( f in a.fa ) {
      var e = a.fa[ f ];
      e.H.Sa > d && ( d = e.H.Sa )
    }
    var f = new $SK( 0 );
    $SP( f, 1, 1, 2 );
    $SP( f, 3, 10, 2 );
    0 < d && $SP( f, 10, d, 8 );
    $SP( f, 2, 1, 2 );
    d = $SM( f );
    f = a.h.random();
    e = {};
    e.groupid = a.ua;
    e.channel = 144;
    e.type = 21;
    e.refid = 0;
    e.expiry = 60;
    e.flag = 1028;
    a.h.M( e, f, d )
  }
}
$S.M = function ( a, d, e ) {
  e && void 0 != e && null != e && 0 != e || ( e = this.h.random() );
  if ( void 0 == a || null == a ) a = {}, a.id = this.h.xb(), a.ya = this.ua, a.Y = 0;
  var f = {};
  f.groupid = a.H.Ka;
  f.channel = 144;
  f.type = 21;
  f.refid = a.Y;
  f.expiry = 5;
  f.flag = 1028;
  this.h.M( f, e, d )
};
$S.Qd = function ( a, d, e, f ) {
  var h = {};
  h.Ka = this.ua;
  h.uid = this.h.xb();
  h.name = d;
  h.address = e;
  h.Ea = 0;
  h.va = a;
  void 0 != f && ( h.Ea = f );
  return new $S9( this, h, !0 )
};
$S.Td = function () {
  return this.fa
};
$S5.prototype.setRoom = $S5.prototype.qe;
$S5.prototype.leaveRoom = $S5.prototype.Zd;
$S5.prototype.getLocalParticipant = $S5.prototype.Qd;
$S5.prototype.getParticipants = $S5.prototype.Td;

function $S9 ( a, d, e ) {
  this.X = a;
  this.H = d;
  this.ea = e;
  this.Ca = this.Wc = null;
  this.v = this.u = !0;
  this.source = 1;
  this.B = 3;
  this.stream = null;
  this.La()
}
$S = $S9.prototype;
$S.La = function () {
  this.fb = this.hc = this.J = null;
  this.jb = !0;
  this.Wb = this.yb = !1;
  this.Qc = this.codecs = this.media = this.c = null;
  this.width = 0;
  this.J = null;
  this.media = {
    video: {
      source: this.source,
      send: this.v,
      F: !1,
      replace: !0
    },
    audio: {
      send: this.u,
      F: !1,
      o: !0
    }
  };
  this.Kb = null;
  this.Ia = !1;
  this.sb = null;
  this.Rb = this.mc = 0;
  this.na = null;
  this.Lc = 0
};
$S.update = function ( a ) {
  if ( a.Sa > this.H.Sa ) return this.R(), !1;
  this.H = a;
  return !0
};
$S.wb = function () {
  return this.H.uid
};
$S.Od = function () {
  return this.Y
};
$S.Ub = function () {
  return this.H.address
};
$S.Sd = function () {
  return this.H.name
};
$S.Wd = function () {
  return this.H.va
};
$S.yb = function () {
  return this.yb
};
$S.Wb = function () {
  return this.Wb
};
$S.Jc = function () {
  return this.ea
};
$S.Yd = function () {
  return this.H.vd
};

function $SMb ( a, d ) {
  if ( !a.X.Jb ) try {
    var e = d.play();
    void 0 === e || e.Pe || e.then( function () {
      a.X.Jb = !0
    }, function () {
      console.log( "rejected" );
      a.X.Jb = !1;
      this.Ca( this, 59 )
    } ).catch( function () { } )
  } catch ( f ) { }
}
$S.ob = function ( a, d, e, f ) {
  console.log( "attach: invoked on uid " + this.H.uid + ", element: " + a );
  if ( void 0 == a || null == a ) return !1;
  if ( void 0 == d || null == d ) d = function () { };
  if ( "object" !== typeof a ) {
    var h = a;
    a = document.getElementById( a );
    if ( !a ) {
      if ( void 0 === e || null === e ) e = 100;
      if ( void 0 === f || null === f || 100 < f ) f = 50;
      if ( this.stream && 0 < e && 0 < f ) {
        console.log( "attach (" + h + "): no element found, trying after " + e + "ms" );
        var l = this;
        setTimeout( function () {
          l.ob( h, d, e, f - 1 )
        }, e );
        return !0
      }
      console.log( "attach (" + h + "): giving up, failed" );
      d( !1 );
      return !1
    }
  }
  if ( this.stream ) {
    if ( this.J == a && this.J.srcObject == this.stream ) console.log( "attach (" + a.id + "): this stream already attached" );
    else {
      var m = this.J;
      this.J = a;
      a.addEventListener( "playing", function () { }, !0 );
      console.log( "attach (" + a.id + "):attaching stream" );
      $Sma( this.J, this.stream );
      if ( m && m != a && m.srcObject == this.stream ) try {
        m.srcObject = null
      } catch ( v ) {
        m.src = null
      }
      $SMb( this, this.J )
    }
    d( !0 );
    $SNb( this )
  } else this.J = a, console.log( "attach (" + a.id + "):no stream" ), d( !1 )
};
$S.Ad = function () {
  $SNb( this )
};

function $S$ ( a ) {
  return a.J ? a.J.clientWidth : 0
}

function $SOb ( a, d, e ) {
  var f = a.X,
    h = {},
    l = 0,
    m = 0,
    v = 0,
    w;
  for ( w in f.oa ) {
    var x = f.oa[ w ];
    x.Jc() ? v++ : ( l += $S$( x ), m++ )
  }
  h.xd = l;
  h.hd = m;
  h.c = v;
  h.width = $S$( a );
  h.height = a.J ? a.J.clientHeight : 0;
  h.flags = a.media.video && 2 == a.media.video.source ? h.flags | 256 : h.flags & -257;
  h.ef = e;
  d.media = h
}
$S.call = function ( a, d, e, f ) {
  void 0 == a && ( a = {} );
  if ( this.Ia && !this.Kb ) this.R( 1 );
  else if ( this.Ia ) return this.ea ? ( this.source = $So( a, "source", this.source ), this.zc( this.source ) ) : !1;
  this.hc = d;
  "object" !== typeof d ? this.J = document.getElementById( d ) : this.J = d;
  this.Wc = e;
  this.Ca = f;
  this.u = $So( a, "audio", this.u );
  this.v = $So( a, "video", this.v );
  this.source = $So( a, "source", this.source );
  this.B = $So( a, "resolution", this.B );
  this.H.Ea = $So( a, "pin", this.H.Ea );
  this.Rb = $So( a, "adminpin", this.Rb );
  this.wa = 0;
  $SPb( this )
};

function $SPb ( a ) {
  a.R();
  if ( !( a.mc > a.X.be ) ) {
    a.mc++;
    a.Y = a.X.h.random() + 4294967296;
    var d = {
      D: 1
    },
      e = {};
    e.ta = a.H.uid;
    e.va = a.H.va;
    e.Ea = a.H.Ea;
    e.flags = 7;
    d.p = e;
    a.ea ? ( d.media = {}, d.media.xc = navigator.userAgent ) : $SOb( a, d, 0 );
    d = $S7( d );
    a.Ia = !0;
    a.Kb = null;
    e = a.X;
    e.oa[ a.Y ] = a;
    e.M( a, d, void 0 )
  }
}

function $SLb ( a, d, e ) {
  var f = {
    D: 3
  };
  f.id = a.Y;
  if ( a.ea ) {
    var h = {
      flags: 1
    };
    a.v && ( h.flags |= 4 );
    a.u && ( h.flags |= 2 );
    f.p = h
  }
  3 != d && ( f.media = a.Qc, f.media ? f.media.flags = a.media.video && 2 == a.media.video.source ? f.media.flags | 256 : f.media.flags & -257 : console.log( "media is null " + d ) );
  f.sdp = e;
  f.je = d;
  d = $S7( f );
  a.X.M( a, d )
}
$S.zc = function ( a ) {
  if ( !a || !this.ea || !this.Ia ) return !1;
  this.v = this.na.flags & 4 ? !0 : !1;
  if ( !this.v ) return !1;
  var d = this.media.video.source;
  this.media = {
    video: {
      source: a,
      B: this.B,
      send: this.v,
      F: !1,
      replace: !0
    },
    audio: {
      send: this.u,
      F: !1,
      o: !0
    }
  };
  this.u || ( this.media.audio.remove = !0 );
  this.c.createOffer( this.media, this );
  return d
};

function $SKb ( a, d ) {
  "connected" != d && "completed" != d ? a.sb || ( a.sb = setTimeout( function () {
    $SPb( a )
  }, 1E4 ) ) : "connected" == d && ( clearTimeout( a.sb ), a.sb = null, a.mc = 0 )
}

function $SQb ( a, d, e ) {
  var f = {
    D: 4
  };
  f.id = a.Y;
  e && ( e = {
    flags: 1
  }, a.v && ( e.flags |= 4 ), a.u && ( e.flags |= 2 ), f.p = e );
  d && $SOb( a, f, 1 );
  d = $S7( f );
  a.X.M( a, d )
}

function $SNb ( a ) {
  a.ea || ( 0 == $S$( a ) ? setTimeout( function () {
    $SNb( a )
  }, 100 ) : a.Lc != $S$( a ) && ( a.Lc = $S$( a ), $SQb( a, !0, !1 ) ) )
}

function $SIb ( a, d ) {
  if ( d.Xa || d.width ) {
    var e = a.c.Vd();
    if ( e ) {
      var f = e.track.getSettings().width,
        h = e.getParameters();
      h.encodings || ( h.encodings = [ {} ] );
      d.Xa && 0 < d.Xa && ( h.encodings[ 0 ].maxBitrate = d.Xa );
      h.encodings[ 0 ].scaleResolutionDownBy = a.media.video && d.width && 2 != a.media.video.source ? Math.max( f / d.width, 1 ) : 1;
      a.media.video && 2 == a.media.video.source && ( h.encodings[ 0 ].scaleResolutionDownBy = 1, h.encodings[ 0 ].maxBitrate = 4096E3 );
      try {
        e.setParameters( h )
      } catch ( l ) { }
    }
  }
}
$S.R = function ( a ) {
  if ( !this.Ia ) return !1;
  this.c && ( this.c.R(), this.c = null );
  this.Ia = !1;
  this.J && ( this.J.srcObject = null );
  if ( void 0 == a || !a ) {
    var d = {
      D: 5
    };
    d.id = this.Y;
    d = $S7( d );
    this.X.M( this, d, 0, !0 )
  }
  a && this.Ca && this.Ca( this, 64 );
  this.La()
};
$S.da = function ( a, d ) {
  if ( a ) {
    if ( this.v != d ) return;
    this.v = !d
  } else {
    if ( this.u != d ) return;
    this.u = !d
  }
  this.ea ? ( this.v = this.v && this.na.flags & 4 ? !0 : !1, this.u = this.u && this.na.flags & 2 ? !0 : !1, this.c.da( a, a ? !this.v : !this.u ), 1 != this.media.video.source ? $SQb( this, !1, !0 ) : ( this.media.video ? this.media = {
    video: {
      source: this.media.video.source,
      B: this.B,
      send: this.v,
      F: !1
    },
    audio: {
      send: this.u,
      F: !1
    }
  } : this.media = {
    video: !1,
    audio: {
      send: this.u,
      F: !1
    }
  }, a ? this.media.video && !this.v && ( this.media.video.remove = !0 ) : this.u || ( this.media.audio.remove = !0 ), this.c.createOffer( this.media, this ) ) ) : $SQb( this, !1, !0 )
};
$S.ce = function ( a, d ) {
  return void 0 != d && d ? a ? !this.H.video : !this.H.audio : a ? !this.v : !this.u
};
$S.ye = function ( a ) {
  if ( a ) return this.da( a, this.v ), !this.v;
  this.da( a, this.u );
  return !this.u
};
$S.oe = function ( a ) {
  this.fb = a
};
$S.ka = function () {
  return this.fb
};
$S.Ud = function () {
  return this.J
};
window.MesiboParticipant = $S9;
$S9.prototype.getId = $S9.prototype.wb;
$S9.prototype.getCallId = $S9.prototype.Od;
$S9.prototype.getAddress = $S9.prototype.Ub;
$S9.prototype.getName = $S9.prototype.Sd;
$S9.prototype.hasVideo = $S9.prototype.yb;
$S9.prototype.hasAudio = $S9.prototype.Wb;
$S9.prototype.isLocal = $S9.prototype.Jc;
$S9.prototype.isTalking = $S9.prototype.Yd;
$S9.prototype.attach = $S9.prototype.ob;
$S9.prototype.fullScreen = $S9.prototype.Ad;
$S9.prototype.call = $S9.prototype.call;
$S9.prototype.mute = $S9.prototype.da;
$S9.prototype.toggleMute = $S9.prototype.ye;
$S9.prototype.muteStatus = $S9.prototype.ce;
$S9.prototype.changeSource = $S9.prototype.zc;
$S9.prototype.hangup = $S9.prototype.R;
$S9.prototype.setOpaque = $S9.prototype.oe;
$S9.prototype.getOpaque = $S9.prototype.ka;
$S9.prototype.getPlayer = $S9.prototype.Ud;
$S9.prototype.getType = $S9.prototype.Wd;
$S9.prototype.init = $S9.prototype.La;
$S = $SV.prototype;
$S.D = 0;
$S.result = 0;
$S.error = 0;
$S.name = 0;
$S.email = 0;
$S.password = 0;
$S.phone = 0;
$S.type = 0;
$S.uid = 0;
$S.s = 0;
$S.country = 0;
$S.cookie = 0;
$S.H = 0;
$S.Ja = 0;
$S.Pb = 0;
$S.ptime = 0;
$S.amount = 0;
$S.currency = 0;
$S.status = 0;
$S.ta = 0;
$S.address = 0;
$S.id = 0;
$S.image = 0;
$S.rate = 0;
$S.channel = 0;
$S.Y = 0;
$S.message = 0;
$S.ya = 0;
$S.wa = 0;
$S.I = 0;
$S.I = 0;
$S.data = 0;
$S.Id = 0;
$S1.prototype.I = 0;
$SV.prototype.appId = 0;
$SV.prototype.I = 0;
$S1.prototype.I = 0;
Navigator.prototype.mozGetUserMedia = function () { };
const MESIBO_FLAG_DELIVERYRECEIPT = 0x1;
const MESIBO_FLAG_READRECEIPT = 0x2;
const MESIBO_FLAG_TRANSIENT = 0x4;
const MESIBO_FLAG_FILETRANSFERRED = 0x10000;
const MESIBO_FLAG_FILEFAILED = 0x20000;
const MESIBO_FLAG_QUEUE = 0x40000;
const MESIBO_FLAG_NONBLOCKING = 0x80000;
//   protected final static int FLAG_DONTSEND = 0x200000;
const MESIBO_FLAG_EOR = 0x800000;


const MESIBO_FLAG_DEFAULT = ( MESIBO_FLAG_DELIVERYRECEIPT | MESIBO_FLAG_READRECEIPT );

const MESIBO_STATUS_UNKNOWN = 0;
const MESIBO_STATUS_ONLINE = 1;
const MESIBO_STATUS_OFFLINE = 2;
const MESIBO_STATUS_SIGNOUT = 3;
const MESIBO_STATUS_AUTHFAIL = 4;
const MESIBO_STATUS_STOPPED = 5;
const MESIBO_STATUS_CONNECTING = 6;
const MESIBO_STATUS_CONNECTFAILURE = 7;
const MESIBO_STATUS_NONETWORK = 8;
const MESIBO_STATUS_MANDUPDATE = 10;
const MESIBO_STATUS_SHUTDOWN = 20;
const MESIBO_STATUS_ACTIVITY = -1;

const MESIBO_MSGSTATUS_OUTBOX = 0;
const MESIBO_MSGSTATUS_SENT = 1;
const MESIBO_MSGSTATUS_DELIVERED = 2;
const MESIBO_MSGSTATUS_READ = 3;
const MESIBO_MSGSTATUS_RECEIVEDNEW = 0x12;
const MESIBO_MSGSTATUS_RECEIVEDREAD = 0x13;
const MESIBO_MSGSTATUS_FAIL = 0x80;
const MESIBO_MSGSTATUS_USEROFFLINE = 0x81;
const MESIBO_MSGSTATUS_INBOXFULL = 0x82;
const MESIBO_MSGSTATUS_INVALIDDEST = 0x83;
const MESIBO_MSGSTATUS_EXPIRED = 0x84;

const MESIBO_READFLAG_READRECEIPT = 1;
const MESIBO_READFLAG_SENDLAST = 2;
const MESIBO_READFLAG_FIFO = 4;
const MESIBO_READFLAG_SUMMARY = 0x10;
const MESIBO_READFLAG_SENDEOR = 0x20;
const MESIBO_READFLAG_WITHFILES = 0x80;

const MESIBO_RESULT_OK = 0;
const MESIBO_RESULT_FAIL = 0x80;
const MESIBO_RESULT_GENERROR = 0x81;
const MESIBO_RESULT_NOSUCHUSER = 0x83;
const MESIBO_RESULT_INBOXFULL = 0x84;
const MESIBO_RESULT_BADREQ = 0x85;
const MESIBO_RESULT_OVERCAPACITY = 0x86;
const MESIBO_RESULT_RETRYLATER = 0x87;

const MESIBO_RESULT_TIMEOUT = 0xB0;
const MESIBO_RESULT_CONNECTFAIL = 0xB1;
const MESIBO_RESULT_DISCONNECTED = 0xB2;
const MESIBO_RESULT_REQINPROGRESS = 0xB3;
const MESIBO_RESULT_BUFFERFULL = 0xB4;

const MESIBO_RESULT_AUTHFAIL = 0xC0;
const MESIBO_RESULT_DENIED = 0xC1;

const MESIBO_ORIGIN_REALTIME = 0;
const MESIBO_ORIGIN_DBMESSAGE = 1;
const MESIBO_ORIGIN_DBSUMMARY = 2;
const MESIBO_ORIGIN_DBPENDING = 3;
const MESIBO_ORIGIN_FILTER = 4;
const MESIBO_ORIGIN_MESSAGESTATUS = 5;

//Activity 0-1000 reserved for Mesibo
const MESIBO_ACTIVITY_NONE = 0;
const MESIBO_ACTIVITY_ONLINE = 1;
const MESIBO_ACTIVITY_ONLINERESP = 2;
const MESIBO_ACTIVITY_TYPING = 3;
const MESIBO_ACTIVITY_TYPINGCLEARED = 4;
const MESIBO_ACTIVITY_JOINED = 10;
const MESIBO_ACTIVITY_LEFT = 11;

const MESIBO_CALLSTATUS_NONE = 0x00;
const MESIBO_CALLSTATUS_OFFER = 0x01;
const MESIBO_CALLSTATUS_INPROGRESS = 0x02;
const MESIBO_CALLSTATUS_RINGING = 0x03;
const MESIBO_CALLSTATUS_ANSWER = 0x05;
const MESIBO_CALLSTATUS_UPDATE = 0x06;
const MESIBO_CALLSTATUS_DTMF = 0x07;
const MESIBO_CALLSTATUS_SDP = 0x08;
const MESIBO_CALLSTATUS_MUTE = 0x09;
const MESIBO_CALLSTATUS_UNMUTE = 0x0A;
const MESIBO_CALLSTATUS_HOLD = 0x0B;
const MESIBO_CALLSTATUS_UNHOLD = 0x0C;
const MESIBO_CALLSTATUS_PING = 0x21;
const MESIBO_CALLSTATUS_INFO = 0x23;
const MESIBO_CALLSTATUS_ECHO = 0x24;
const MESIBO_CALLSTATUS_REDIRECT = 0x25;


// Phone Specific ERRORs
const MESIBO_CALLSTATUS_COMPLETE = 0x40;
const MESIBO_CALLSTATUS_CANCEL = 0x41;
const MESIBO_CALLSTATUS_NOANSWER = 0x42;
const MESIBO_CALLSTATUS_BUSY = 0x43;
const MESIBO_CALLSTATUS_UNREACHABLE = 0x44;
const MESIBO_CALLSTATUS_OFFLINE = 0x45;
const MESIBO_CALLSTATUS_INVALIDDEST = 0x46;
const MESIBO_CALLSTATUS_INVALIDSTATE = 0x47;
const MESIBO_CALLSTATUS_NOCALLS = 0x48;
const MESIBO_CALLSTATUS_NOVIDEOCALLS = 0x49;
const MESIBO_CALLSTATUS_NOTALLOWED = 0x4A;

//Local Status used by client
const MESIBO_CALLSTATUS_CHANNELUP = 0x30;
const MESIBO_CALLSTATUS_QUALITY = 0x31;
const MESIBO_CALLSTATUS_RECONNECTING = 0x32;
const MESIBO_CALLSTATUS_SERVER = 0x3A;

const MESIBO_CALLSTATUS_AUTHFAIL = 0x50;
const MESIBO_CALLSTATUS_NOCREDITS = 0x51;
const MESIBO_CALLSTATUS_NONTRINGMEDEST = 0x52;
const MESIBO_CALLSTATUS_INCOMPATIBLE = 0x53;
const MESIBO_CALLSTATUS_BADCALLID = 0x54;

// Generic Errors
const MESIBO_CALLSTATUS_ERROR = 0x60;
const MESIBO_CALLSTATUS_HWERROR = 0x61;
const MESIBO_CALLSTATUS_NETWORKERROR = 0x62;
const MESIBO_CALLSTATUS_NETWORKBLOCKED = 0x63;


Mesibo.prototype[ 'build_date' ] = function () {
  return 'Jan 25, 2021 03:29 GMT';
}
console.log( 'mesibo JavaScript API Build: Jan 25, 2021 03:29 GMT' );
