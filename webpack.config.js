const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { join } = require('path');
const root = process.cwd();

console.log(root);

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
    plugins: [
        new VueLoaderPlugin(),
    ],
};
