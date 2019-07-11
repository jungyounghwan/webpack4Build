const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['@babel/polyfill', './npm-name/app.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './npm-name/dist'),
        libraryTarget: 'var',
        library: 'UI',
    },
    devServer: {
        contentBase: path.join(__dirname, '/npm-name/'),
        compress: false,
        port: 7777
    },
    plugins: [
        new CleanWebpackPlugin(['./npm-name/dist'])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname),
                use: {
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    optimization: {
        minimize: true
    },
    devtool: 'source-map'
};
