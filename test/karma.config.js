module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: true,
        frameworks: ['mocha'],
        files: [
            '../node_modules/chai/chai.js',
            '../node_modules/sinon/pkg/sinon.js',
            '../node_modules/sinon-chai/lib/sinon-chai.js',
            '../test/runner.js',
            '../src/**/*.spec.js',
        ],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
        browsers: ['ChromeHeadlessNoSandbox'],
        reporters: ['progress'],
        preprocessors: {
            '../test/runner.js': ['rollup'],
            '../src/**/*.spec.js': ['rollup'],
        },
        rollupPreprocessor: {
            plugins: [
                require('rollup-plugin-node-resolve')({
                    jsnext: true,
                    browser: true,
                }),
                require('rollup-plugin-vue').default(),
                require('rollup-plugin-buble')({
                    objectAssign: 'Object.assign',
                }),
                require('rollup-plugin-commonjs')(),
            ],
            output: {
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
            }],
        },

        singleRun: true,
    });
};
