var webpack = require('./webpack.config');
var path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: false,
    frameworks: ['jasmine-ajax', 'jasmine'],
    files: ['tests.webpack.js'],
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-jasmine-ajax',
      'karma-phantomjs-launcher'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack']
    },
    webpack: webpack,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  });
};
