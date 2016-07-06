//const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const TARGET            = process.env.npm_lifecycle_event;
const ENV               = process.env.npm_lifecycle_event.indexOf('build') !== -1 ? 'prod' : 'dev';
const SUPPRESS_WARNINGS = !!process.env.npm_config_suppress_warnings;
const BUILD_NAME        = 'MAIN';

const PATHS = {
  app:   path.join(__dirname, 'app'),
  build: path.join(__dirname, '..', 'public')
};


console.log(" ");
console.log(BUILD_NAME);
console.log('resolve: ' + path.resolve(__dirname, 'app'));
console.log(" ");


const common = {
    entry: {
        main: PATHS.app + '/index.jsx',
    },
    resolve: {
        root: [
            PATHS.app,
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.[name].js'
    },
    module: {
        loaders: [
          { //passes css straight through
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.app
          },
          {
            test: /\.jsx?$/,
            loader: 'babel',
            include: PATHS.app,
            query:   {
                cacheDirectory: true,
                presets: [
                    'react',
                    'es2015',
                    'stage-2'
                ]
            }
          },
          {
            test: /\.jsx\.html$/,
            loader: 'react-templates-loader',
            include: PATHS.app
          },
          {
            test: /\.(png|jpg|svg|ico|gif|eot|woff|ttf)$/,
            loader: 'file?name=[path][name].[ext]'
          }
        ]
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
              new htmlWebpackPlugin({
                  template:     PATHS.app+'/index.ejs',
                  appMountId:   'app',
                  window:       {},
                  favicon:      path.resolve(__dirname, '..', 'public', 'images', 'branding')+'/favicon.ico',
                  inject:       false,
                  minify: { //https://github.com/kangax/html-minifier
                      removeComments: true,
                      collapseWhitespace: true,
                      caseSensitive: true,
                      preserveLineBreaks: true,
                      removeTagWhitespace: true,
                      removeAttributeQuotes: true
                  }
              })
          ];

          if (SUPPRESS_WARNINGS) {
              a.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
          }

          return a;
    })()
};



if(ENV === 'dev') {
    module.exports = merge(common, {
        output: {
          publicPath: '/'
        },
        devtool: 'eval-source-map',
        devServer: {
          historyApiFallback: true,
          hot: true,
          inline: true,
          progress: true,
          // Display only errors to reduce the amount of output.
          stats: 'errors-only',
          // Parse host and port from env so this is easy to customize.
          host: process.env.HOST,
          port: process.env.PORT,
          watchOptions: {
           aggregateTimeout: 300,
           poll: 1000
         }
        },
        module: {
          loaders: [
            {
              test: /\.scss$/,
              loaders: ['style', 'css', 'pleeease', 'sass'],
            }
          ]
        },
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          }),
          new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(ENV === 'prod') {
    module.exports = merge(common, {
        output: {
            publicPath: '/'
        },
        module: {
            loaders: [
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
        plugins: [
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new ExtractTextPlugin("styles.[name].[chunkhash].[id].css")
        ]
    });
}
