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
            test: /\.(png|jpg|svg|ico|gif|eot|woff|ttf)$/,
            loader: 'file?name=[path][name].[ext]'
          }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template:     PATHS.app+'/index.ejs',
            appMountId:   'app',
            window:       {default: '4'},
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
    ]
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
              loaders: ['style', 'css', 'sass'],
            }
          ]
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.DefinePlugin({
              'process.env.NODE_ENV': (ENV === 'dev' ? JSON.stringify('development') : JSON.stringify('production')),
              'process.env.DEFAULT_PAGE': JSON.stringify('4')
          })
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
                    loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
                }
            ]
        },
        plugins: [
            // function()
            // {
            //     this.plugin("done", function(stats)
            //     {
            //         if (stats.compilation.errors && stats.compilation.errors.length)
            //         {
            //           console.log(
            //             stats.toString({
            //               context: path.resolve(__dirname),
            //               colors: true,
            //               chunks: false,
            //               children: false,
            //               chunkModules: false
            //             }));
            //             //console.log(stats.compilation.errors);
            //             process.exit(1);
            //         }
            //     });
            // },
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new ExtractTextPlugin("styles.[name].[chunkhash].[id].css"),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': (ENV === 'dev' ? JSON.stringify('development') : JSON.stringify('production')),
                'process.env.DEFAULT_PAGE': JSON.stringify('4')
            })
        ]
    });
}
