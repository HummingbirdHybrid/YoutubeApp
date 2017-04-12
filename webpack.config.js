const webpack = require('webpack');

module.exports = {
    entry:  './youtube/src/main.js',
    output: {
        path:     __dirname+'/bundle',
        filename: 'bundle.js'
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
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: false
        })
    ]
};
