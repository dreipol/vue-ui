/* eslint-disable global-require */

const TEST_FILES_PATH = '../src/**/*.spec.js';
const webpackConfig = require('../webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: true,
        frameworks: ['mocha'],
        files: [
            // Unit test tools
            '../node_modules/chai/chai.js',
            '../node_modules/sinon/pkg/sinon.js',
            '../node_modules/sinon-chai/lib/sinon-chai.js',
            // Vue Specific dependencies
            '../node_modules/vue/dist/vue.js',
            '../node_modules/vuex/dist/vuex.js',
            '../node_modules/lodash/lodash.js',
            '../node_modules/vue-template-compiler/browser.js',
            '../node_modules/@vue/test-utils/dist/vue-test-utils.umd.js',
            TEST_FILES_PATH,
        ],
        plugins: [
            'karma-*',
        ],
        browsers: ['ChromeHeadless'],
        reporters: [
            'progress',
            'coverage',
        ],
        preprocessors: {
            [TEST_FILES_PATH]: ['webpack'],
        },
        client: {
            mocha: {
                timeout: 3000, // saucelab tests can be really really slow
                // change Karma's debug.html to the mocha web reporter
                reporter: 'html',
            },
        },
        webpack: {
            ...webpackConfig,
            entry: null,
            output: null,
            mode: 'development',
            devtool: 'inline-source-map',
        },
        webpackMiddleware: {
            noInfo: true,
        },
        coverageReporter: {
            dir: '../coverage',
            reporters: [{
                type: 'lcov',
                subdir: 'report-lcov',
            }, {
                type: 'html',
            }],
        },
        singleRun: true,
    });
};
