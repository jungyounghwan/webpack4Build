const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: ['@babel/polyfill', './app.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'var',
        library: 'UI',
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: false,
        port: 8888
    },
    plugins: [
        new CleanWebpackPlugin(['./dist'])
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
