const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const eslintLoader = {
    loader: 'eslint-loader',
    options: {
        failOnWarning: true,
        failOnError: true,
    },
};

module.exports = {
    entry: './dev/index.js',
    output: {
        path: path.join(process.cwd(), 'build'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'PictureLoader',
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                use: [
                    'babel-loader',
                    eslintLoader,
                ],
                exclude: /node_module/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: path.join(process.cwd(), '.eslintrc'),
                },
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: true,
            },
        }),
    ],
};
