module.exports = {
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-export-namespace-from',
        'transform-vue-jsx',
    ],
    env: {
        test: {
            plugins: [[
                'istanbul',
                {
                    exclude: [
                        '**/*.spec.js',
                    ],
                },
            ]],
        },
    },
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                exclude: [
                    'transform-regenerator',
                ],
                targets: {
                    browsers: [
                        'last 2 versions',
                        'safari >= 7',
                    ],
                },
            },
        ],
    ],
};
