const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['@babel/polyfill', './npm-name/app.js']
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './npm-name/dist/'),
            libraryTarget: 'var',
            library: 'UI',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname, './npm-name/app.js'),
                    use: {
                        loader : 'babel-loader',
                        options : {
                            presets : ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(s*)css$/, // match any .scss or .css file,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new TerserPlugin()
        ],
        devtool: 'source-map'
    }

    if(options.mode === 'development') {

        config.devServer = {
            hot: true,
            contentBase: path.join(__dirname, '/npm-name/'),
            port: 7777
        };

    } else {
        // Production ¼³Á¤
        config.plugins = [
            new CleanWebpackPlugin(['dist'])
        ];

        config.optimization = {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    sourceMap: true,
                }),
            ],
        };
    }

    return config;
};
