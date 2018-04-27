module.exports = function (config) {
  var webdriverConfig = {
    hostname: 'selenium-hub',
    port: 4444
  };

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-webdriver-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    customLaunchers: {
      'firefox': {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'firefox'
      },
      'chrome': {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'chrome'
      }
    },
    browsers: ['firefox', 'chrome'],
    singleRun: false,
    browserNoActivityTimeout: 60000
  });
};
