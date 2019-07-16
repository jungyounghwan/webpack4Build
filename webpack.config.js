const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        app: ['@babel/polyfill', './motion/app.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './motion/dist/'),
        libraryTarget: 'var',
        library: 'UI'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { sourceMap: true },
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization : {
        minimizer: [
            new TerserPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    devtool: 'source-map'
};
