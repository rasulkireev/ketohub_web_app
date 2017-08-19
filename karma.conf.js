// Karma configuration
// Generated on Sat Feb 18 2017 09:33:16 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    basePath: './app',

    frameworks: ['jasmine'],

    files: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '*.js',
    ],

    exclude: [
    ],

    preprocessors: {
      'app.js': ['coverage'],
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
