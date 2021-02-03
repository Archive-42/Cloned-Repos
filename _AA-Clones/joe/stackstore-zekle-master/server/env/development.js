module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "There is no fate but what we make",
  "TWITTER": {
    "consumerKey": "NU9QvilIv4bb090mWzQQHDqJ7",
    "consumerSecret": "ARNeA4xyaTPlVV4T7xptHhGXetFyrm1ZskUhUdESnyjjBubqyv",
    "callbackUrl": "/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "1597172593898449",
    "clientSecret": "789901e969ad762e77ed7888436c6318",
    "callbackURL": "/auth/facebook/callback"
  },
  // "GOOGLE": {
  //   "clientID": "806320124768-vm4t53pkdm07ocgkap3pvtqvue7jjt7i.apps.googleusercontent.com",
  //   "clientSecret": "H3dBz6rr_y7-gxSNTHvFXrfS",
  //   "callbackURL": "/auth/google/callback"
  // },
  "GOOGLE":{
    "clientID":"885339505275-d4l6dcgdi6a1lukmabbiv59on0an41gh.apps.googleusercontent.com",
    "clientSecret":"aK_A8SLo-mQ9E-gD5k3WsR_z",
    "callbackURL":"/auth/google/callback"
  },
  "STRIPE": {
    "clientID": "Zekle",
    //Note: Secret is testing version....live version on Stripe account page
    "clientSecret": "sk_test_qhzQZUmT0xx9LVwnCTpWidnc",
    "callbackURL": "/auth/stripe/callback"
  }
};