// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
import firebase from "firebase/app";
import "firebase/auth";

// Docs: https://source.corp.google.com/piper///depot/google3/third_party/devsite/firebase/en/docs/auth/web/yahoo-oauth.md

function yahooProvider() {
  // [START auth_yahoo_provider_create]
  var provider = new firebase.auth.OAuthProvider('yahoo.com');
  // [END auth_yahoo_provider_create]

  // [START auth_yahoo_provider_scopes]
  // Request access to Yahoo Mail API.
  provider.addScope('mail-r');
  // Request read/write access to user contacts.
  // This must be preconfigured in the app's API permissions.
  provider.addScope('sdct-w');
  // [END auth_yahoo_provider_scopes]

  // [START auth_yahoo_provider_params]
  provider.setCustomParameters({
    // Prompt user to re-authenticate to Yahoo.
    prompt: 'login',
    // Localize to French.
    language: 'fr'
  });  
  // [END auth_yahoo_provider_params]
}

function yahooSignInPopup(provider) {
  // [START auth_yahoo_signin_popup]
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // IdP data available in result.additionalUserInfo.profile
      // ...

      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // Yahoo OAuth access token and ID token can be retrieved by calling:
      var accessToken = credential.accessToken;
      var idToken = credential.idToken;
    })
    .catch((error) => {
      // Handle error.
    });
  // [END auth_yahoo_signin_popup]
}

function yahooSignInRedirect(provider) {
  // [START auth_yahoo_signin_redirect]
  firebase.auth().signInWithRedirect(provider);
  // [END auth_yahoo_signin_redirect]
}

function yahooSigninRedirectResult() {
  // [START auth_yahoo_signin_redirect_result]
  firebase.auth().getRedirectResult()
    .then((result) => {
      // IdP data available in result.additionalUserInfo.profile
      // ...

      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // Yahoo OAuth access token and ID token can be retrieved by calling:
      var accessToken = credential.accessToken;
      var idToken = credential.idToken;
    })
    .catch((error) => {
      // Handle error.
    });
  // [END auth_yahoo_signin_redirect_result]
}

function yahooLinkPopup() {
  // [START auth_yahoo_link_popup]
  var provider = new firebase.auth.OAuthProvider('yahoo.com');
  firebase.auth().currentUser.linkWithPopup(provider)
      .then((result) => {
        // Yahoo credential is linked to the current user.
        // IdP data available in result.additionalUserInfo.profile.
        // Yahoo OAuth access token can be retrieved by calling:
        // result.credential.accessToken
        // Yahoo OAuth ID token can be retrieved by calling:
        // result.credential.idToken
      })
      .catch((error) => {
        // Handle error.
      });
  // [END auth_yahoo_link_popup]
}

function yahooReauthPopup() {
  // [START auth_yahoo_reauth_popup]
  var provider = new firebase.auth.OAuthProvider('yahoo.com');
  firebase.auth().currentUser.reauthenticateWithPopup(provider)
      .then((result) => {
        // User is re-authenticated with fresh tokens minted and
        // should be able to perform sensitive operations like account
        // deletion and email or password update.
        // IdP data available in result.additionalUserInfo.profile.
        // Yahoo OAuth access token can be retrieved by calling:
        // result.credential.accessToken
        // Yahoo OAuth ID token can be retrieved by calling:
        // result.credential.idToken
      })
      .catch((error) => {
        // Handle error.
      });
  // [END auth_yahoo_reauth_popup]
}
