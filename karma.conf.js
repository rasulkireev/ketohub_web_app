module.exports = function(config) {
  config.set({

    basePath: './app',

    frameworks: ['jasmine'],

    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../node_modules/angularfire/dist/angularfire.js',
      '../node_modules/firebase/firebase.js',
      '*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'app.js': ['coverage']
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'lcov',
      dir: '../coverage/'
    },

    port: 8000,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chromium_no_sandbox'],

    customLaunchers: {
      Chromium_no_sandbox: {
        base: 'Chromium',
        flags: ['--no-sandbox']
      }
    },

    concurrency: Infinity
  });
};
