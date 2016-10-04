// Karma configuration
// Generated on Thu Mar 10 2016 12:23:49 GMT+0300 (MSK)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'test/lib/jquery.js',
            'test/lib/jasmine-jquery.js',
            'test/lib/angular.js',
            'test/lib/lodash.js',
            'test/lib/moment.js',
            'test/lib/angular-filter.js',
            'test/lib/angular-moment.js',
            'test/lib/ui-bootstrap.js',
            'test/lib/angular-busy.js',
            'test/lib/angular-ui-router.js',
            'test/lib/mask.js',
            'test/lib/angular-ui-notification.js',
            'test/lib/**/*.js',
            'js/**/*.js',
            'test/**/*Spec.js',
            'templates/**/*.html'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

        preprocessors: {
            'templates/**/*.html': 'ng-html2js'
        },

        client: {
            captureConsole: true
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
        ],

        ngHtml2JsPreprocessor: {
            moduleName: "templates",
            cacheIdFromPath : function(filepath) {
                console.log(filepath);
                return '/' + filepath;
            },
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
