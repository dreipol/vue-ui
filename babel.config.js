module.exports = {
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        [
            'istanbul',
            {
                exclude: [
                    '**/*.spec.js',
                ],
            },
        ],
    ],
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
