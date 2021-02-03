// Configuration file for Karma
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: ['karma-jasmine', 'karma-chrome-launcher'],
    autowatch: false,
    singleRun: false,

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/firebase/firebase.js',
      'bower_components/firebase-simple-login/firebase-simple-login.js',
      'bower_components/mockfirebase/dist/mockfirebase.js',
      'src/core/**/*.js',
      'tests/**/*.js'
    ]
  });
};

