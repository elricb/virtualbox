/**
 * Compile app.js which contains the Wordpress template html and main app js code
 **/
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const TARGET            = process.env.npm_lifecycle_event;
const SUPPRESS_WARNINGS = !!process.env.npm_config_suppress_warnings;
const BUILD_NAME        = 'APP.js';

const PATHS = {
  app:   path.join(__dirname, 'app'),
  src:   path.join(__dirname, 'src'),
  build: path.join(__dirname, '..', 'public')
};

const START = {
  app:      PATHS.src + '/app/test.jsx'
};

const BASE_ROOT = [
  path.resolve(__dirname, 'src/app'),
  path.resolve(__dirname, 'node_modules')
];


console.log(" ");
console.log(BUILD_NAME);
console.log('domain: n/a');
console.log(" ");


module.exports = {
    entry: {
        main: START.app,
    },
    resolve: {
        root: [path.join(PATHS.app).concat(BASE_ROOT)],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        publicPath: '/',
        path: PATHS.build,
        filename: 'app.js'
    },
    module: {
        loaders: [
            { //passes css straight through
                  test: /\.css$/,
                  include: [PATHS.app, PATHS.src],
                  loaders: ['style', 'css']
            },
            {
                  test: /\.jsx?$/,
                  include: [PATHS.app, PATHS.src],
                  exclude: /(node_modules|bower_components)/,
                  loader: 'babel',
                  query: {
                      cacheDirectory: true,
                      presets: ['react', 'es2015']
                  }
            },
            {
                test: /\.(png|jpg|svg|ico|gif|eot|woff|ttf)$/,
                loader: 'file?name=[path][name].[ext]'
            },
            // { //needed for iconv-lite
            //     test: /\.json$/,
            //     //exclude: /node_modules/,
            //     loader: 'json-loader'
            // },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!pleeease!sass')
            }
        ]
    },
    stats: {
        children: false
    },
    plugins: (function() {
        var a = [
            function() {
                this.plugin("done", function(stats)
                {
                  console.log(
                    stats.toString({
                      context: path.resolve(__dirname),
                      colors: true,
                      chunks: false,
                      children: false,
                      chunkModules: false
                    }));
                });
            },
            new webpack.IgnorePlugin(/\/iconv-loader$/),
            new webpack.IgnorePlugin(/\/iconv-lite$/),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                'process.env.DOCKER_PROXY_HOST': '0.0.0.0:8080',
                'process.env.VIRTUAL_HOST': 'http://'+process.env.HOST+':'+process.env.PORT
            }),
            new ExtractTextPlugin("styles.[name].[chunkhash].[id].css")
            //   ,
            //   new htmlWebpackPlugin({
            //       template:     PATHS.app+'/index.ejs',
            //       appMountId:   'app',
            //       window:       {},
            //       favicon:      'app/public/images/branding/favicon.ico',
            //       inject:       false,
            //       minify: { //https://github.com/kangax/html-minifier
            //           removeComments: true,
            //           collapseWhitespace: true,
            //           caseSensitive: true,
            //           preserveLineBreaks: true,
            //           removeTagWhitespace: true,
            //           removeAttributeQuotes: true
            //       }
            //  })
        ];

        if (SUPPRESS_WARNINGS) {
            a.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
        }

        return a;
    })()
};
