module.exports = function(config) {
    "use strict";

    config.set({

        basePath: '.',
        files: [
            'src/**/*.js'
        ],

        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher'],
        browsers: ['Chrome'],
        reporters: ['dots'],

        /**
         * On which port should the browser connect, on which port is the test runner
         * operating, and what is the URL path for the browser to use.
         */
        port: 9018,
        runnerPort: 9100,
        urlRoot: '/',

        autoWatch: false
    });
};