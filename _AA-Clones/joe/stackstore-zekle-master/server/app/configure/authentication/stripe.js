//NOTE: STILL WORKING ON THIS -DAN

'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var util = require('util');
var url = require('url');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var InternalOAuthError = require('passport-oauth').InternalOAuthError;


// Stripe recommends adding the following button to initiate authentication:
// https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_6PjS56uMgoUY92xzZ2mOIR9P1Hao9yqp&scope=read_write
// where should we put it?


passport.use(new StripeStrategy({
    clientID: 'Zekle',
    clientSecret: 'sk_test_qhzQZUmT0xx9LVwnCTpWidnc',
    callbackURL: "http://localhost:1337/auth/stripe/callback"
  },
  function(accessToken, refreshToken, stripe_properties, done) {
    User.findOrCreate({ stripeId: stripe_properties.stripe_user_id }, function (err, user) {
      return done(err, user);
    });
  }
));

function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://connect.stripe.com/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://connect.stripe.com/oauth/token';
  options.scopeSeparator = options.scopeSeparator || ',';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'stripe';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Authenticate request by delegating to a service provider using OAuth 2.0.
 *
 * @param {Object} req
 * @api protected
 */
OAuth2Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var self = this;

  if (req.query && req.query.error) {
    // TODO: Error information pertaining to OAuth 2.0 flows is encoded in the
    //       query parameters, and should be propagated to the application.
    return this.fail();
  }

  var callbackURL = options.callbackURL || this._callbackURL;
  if (callbackURL) {
    var parsed = url.parse(callbackURL);
    if (!parsed.protocol) {
      // The callback URL is relative, resolve a fully qualified URL from the
      // URL of the originating request.
      callbackURL = url.resolve(req.originalURL, callbackURL);
    }
  }

  if (req.query && req.query.code) {
    var code = req.query.code;

    // NOTE: The module oauth (0.9.5), which is a dependency, automatically adds
    //       a 'type=web_server' parameter to the percent-encoded data sent in
    //       the body of the access token request.  This appears to be an
    //       artifact from an earlier draft of OAuth 2.0 (draft 22, as of the
    //       time of this writing).  This parameter is not necessary, but its
    //       presence does not appear to cause any issues.
    this._oauth2.getOAuthAccessToken(code, { grant_type: 'authorization_code', redirect_uri: callbackURL },
      function(err, accessToken, refreshToken, params) {
        if (err) { return self.error(new InternalOAuthError('failed to obtain access token', err)); }

        function verified(err, user, info) {
          if (err) { return self.error(err); }
          if (!user) { return self.fail(info); }
          self.success(user, info);
        }

        // Generate the additional stripe object
        var stripe = {};
        stripe.token_type = params.token_type || null;
        stripe.stripe_publishable_key = params.stripe_publishable_key || null;
        stripe.scope = params.scope || null;
        stripe.livemode = params.livemode || null;
        stripe.stripe_user_id = params.stripe_user_id || null;


        if (self._passReqToCallback) {
          self._verify(req, accessToken, refreshToken, stripe, verified);
        } else {
          self._verify(accessToken, refreshToken, stripe, verified);
        }
      }
    );
  } else {
    // NOTE: The module oauth (0.9.5), which is a dependency, automatically adds
    //       a 'type=web_server' parameter to the query portion of the URL.
    //       This appears to be an artifact from an earlier draft of OAuth 2.0
    //       (draft 22, as of the time of this writing).  This parameter is not
    //       necessary, but its presence does not appear to cause any issues.

    var params = this.authorizationParams(options);
    params['response_type'] = 'code';
    params['redirect_uri'] = callbackURL;
    var scope = options.scope || this._scope;
    if (scope) {
      if (Array.isArray(scope)) { scope = scope.join(this._scopeSeparator); }
      params.scope = scope;
    }
    var state = options.state || req.query.state;
    if (state) { params.state = state; }

    var location = this._oauth2.getAuthorizeUrl(params);
    this.redirect(location);
  }
};

/**
* Override OAuth2 authorizeParams to allow for passing additional params
* per the "pre-fill" feature for Stripe https://stripe.com/docs/connect/reference#get-authorize-request
*
* @param {Object} options
*/

OAuth2Strategy.prototype.authorizationParams = function(options){
    return options;
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


app.get('/auth/stripe',
  passport.authenticate('stripe', { scope: 'read_write' }));

app.get('/auth/stripe/callback',
  passport.authenticate('stripe', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })