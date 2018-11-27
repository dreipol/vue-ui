const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { join, resolve } = require('path');
const root = process.cwd();

module.exports = {
    mode: 'production',
    entry: join(root, 'src/index.js'),
    output: {
        path: root,
        filename: 'index.js',
    },
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        lodash: 'lodash',
        chai: 'chai',
        sinon: 'sinon',
        'headroom.js': 'headroom.js',
        '@vue/test-utils': 'VueTestUtils',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    resolve: {
        modules: [
            resolve(__dirname, 'src'),
            'node_modules',
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};
