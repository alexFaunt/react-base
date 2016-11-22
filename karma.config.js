const browserifyConfig = require('./browserify.config')

// Karma configuration
// Generated on Mon Nov 21 2016 16:49:29 GMT+0000 (GMT)

module.exports = (config) => {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'browserify'],

    // TODO - docs seem to have the app here too, but why?
    // list of files / patterns to load in the browser
    files: [
      './test/**/*.karma.*'
    ],

    exclude: [],

    preprocessors: {
      './test/index.js': ['browserify'],
      './test/**/*.spec.*': ['browserify']
    },

    // Browserify options + some polyfills for enzyme
    browserify: Object.assign({}, browserifyConfig, {
      plugin: ['proxyquireify/plugin'],
      configure: (bundle) => {
        bundle.on('prebundle', () => {
          bundle.external('react/addons')
          bundle.external('react/lib/ReactContext')
          bundle.external('react/lib/ExecutionEnvironment')
        })
      }
    }),

    reporters: ['progress'],
    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: false,

    // web server port
    port: 9876,

    browsers: ['Chrome'],

    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
