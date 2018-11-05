/* eslint-disable global-require */

const TEST_FILES_PATH = '../src/**/*.spec.js';

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
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
        browsers: ['ChromeHeadlessNoSandbox'],
        reporters: [
            'progress',
            /* the coverage doesn't work 100% yet :( 'coverage' */
        ],
        preprocessors: {
            [TEST_FILES_PATH]: ['rollup'],
        },
        rollupPreprocessor: {
            external: ['vue', 'vuex', '@vue/test-utils', 'lodash', 'chai', 'sinon'],
            plugins: [
                require('rollup-plugin-node-resolve')({
                    browser: true,
                    next: true,
                }),
                require('rollup-plugin-vue').default(),
                require('rollup-plugin-buble')({
                    objectAssign: 'Object.assign',
                }),
                require('rollup-plugin-replace')({
                    'process.env.NODE_ENV': JSON.stringify('production'),
                }),
                require('rollup-plugin-commonjs')(),
                require('rollup-plugin-istanbul')({
                    exclude: [
                        'node_modules/**/*',
                        TEST_FILES_PATH,
                    ],
                }),
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    vuex: 'Vuex',
                    lodash: 'lodash',
                    chai: 'chai',
                    sinon: 'sinon',
                    '@vue/test-utils': 'VueTestUtils',
                },
                format: 'iife',
                sourcemap: 'inline',
            },
        },

        client: {
            mocha: {
                timeout: 3000, // saucelab tests can be really really slow
                // change Karma's debug.html to the mocha web reporter
                reporter: 'html',
            },
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
