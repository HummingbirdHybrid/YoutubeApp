const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:  {
        bundle: './src/js/main.js',
        style: './src/css/style.css',
        index: './index.html'
    },
    output: {
        path:     __dirname+'/bundle',
        filename: '[name].js',
        chunkFilename: "[id].js"
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract( "css-loader")
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }]
            }
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: true
        }),
        new ExtractTextPlugin("[name].css")
    ]
};
