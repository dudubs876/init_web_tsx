var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var CSS_EXTRACTOR = new ExtractTextPlugin('[name].css');
var SASS_LOADER = CSS_EXTRACTOR.extract('css-loader!sass-loader');


module.exports = {
    "devtool": "eval",
    "entry": {
        "index": __dirname + "/src/index",
    },
    "module": {
        "loaders": [{
            "loaders": [
                "html-loader"
            ],
            "test": /\.html$/
        }, {
            "loader": "file-loader",
            "options": {
                "name": "fonts/[name].[ext]?[hash]"
            },
            "test": /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/
        }, {
            "loader": SASS_LOADER,
            "test": /\.scss$/
        }, {
            "loaders": [
                "ts-loader?transpileOnly=true"
            ],
            "test": /\.tsx?$/
        }]
    },
    "output": {
        "filename": "[name].js",
        "path": __dirname + "/bundles",
        "pathinfo": true
    },
    "plugins": [
        CSS_EXTRACTOR,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        })
    ],
    "resolve": {
        "extensions": [
            ".ts",
            ".tsx",
            ".js"
        ],
        "modules": [
            __dirname + "/node_modules"
        ]
    },
    "watchOptions": {
        "poll": 500
    }
};
