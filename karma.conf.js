// Karma configuration
// Generated on Sat Feb 18 2017 09:33:16 GMT-0500 (EST)

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

    browsers: ['PhantomJS2'],

    concurrency: Infinity
  });
};
