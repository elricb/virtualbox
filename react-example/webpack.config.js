const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

const TARGET            = process.env.npm_lifecycle_event;
const DOMAIN            = process.env.npm_config_domain || 'easysex.com';
const ENV               = process.env.npm_lifecycle_event.indexOf('build') !== -1 ? 'prod' : 'dev';
const PL_CONFIG         = require('./webpack.config.pl.js')(DOMAIN, ENV);
const HOME              = process.env.HOME ? process.env.HOME : process.env.HOMEPATH;
const STATIC_ONLY       = process.env.npm_lifecycle_event.indexOf('-static') !== -1 || PL_CONFIG.isCompliance;
const MAIN_ONLY         = process.env.npm_lifecycle_event.indexOf('-main') !== -1;
const SUPPRESS_WARNINGS = !!process.env.npm_config_suppress_warnings;
const BUILD_NAME        = STATIC_ONLY ? 'STATIC' : (MAIN_ONLY ? 'MAIN' : 'ALL');

const PATHS = {
  app: path.join(__dirname, 'app'),
  lde: HOME+'/Projects/lde',
  build: ENV === 'dev'
      ? path.join(__dirname, 'build', PL_CONFIG.DELOREAN_PAGE.plLabel)
      : HOME+'/Projects/lde/content/resources_de/v5/'+PL_CONFIG.DELOREAN_PAGE.plLabel,
  templates: ENV === 'dev'
      ? 'templates'
      : '../../../templates/'+PL_CONFIG.DELOREAN_PAGE.plDomain,
  fdr: ENV === 'dev'
      ? 'fdr'
      : '../../../../fdr/site-public/'+PL_CONFIG.DELOREAN_PAGE.plDomain+'/en/info'
};

const BASE_ROOT = [
  path.resolve(__dirname, 'app/default'),
  path.resolve(__dirname, 'node_modules')
];


console.log(" ");
console.log(BUILD_NAME);
console.log('domain: '+DOMAIN);
console.log('resources: '+PATHS.build);
console.log('templates: '+PATHS.templates);
console.log('fdr: '+PATHS.fdr);
console.log(" ");


const common = {

  // Entry accepts a path or an object of entries.
  // The build chapter contains an example of the latter.
  entry: {
      main: PATHS.app,
  },
  resolve: {
    root: [path.join(PATHS.app, DOMAIN)].concat(BASE_ROOT),
    extensions: ['', '.js', '.jsx', '.jsx.html']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
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
          }
      ];

      if (SUPPRESS_WARNINGS) {
        a.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
      }

      return a;
  })()
};




// Default configuration
if(ENV === 'dev') {

  var mainConfig = merge(common, {
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
      port: process.env.PORT
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
      new webpack.HotModuleReplacementPlugin(),
      new htmlWebpackPlugin({
          template:     PATHS.app+'/single-page-app.ejs',
          appMountId:   'app',
          PL_DOMAIN:    PL_CONFIG.DELOREAN_PAGE.plDomain || '',
          PL_LABEL:     PL_CONFIG.DELOREAN_PAGE.plLabel || '',
          PL_STATIC:    PL_CONFIG.DELOREAN_PAGE.plStatic || '',
          PL_ID:        PL_CONFIG.DELOREAN_PAGE.plId || '',
          PL_DCSID:     PL_CONFIG.DELOREAN_PAGE.plDcsid || '',
          PL_ENV:       PL_CONFIG.DELOREAN_PAGE.plEnv || '',
          name:         PL_CONFIG.DELOREAN_PAGE.name || '',
          window:       {DELOREAN_PAGE:PL_CONFIG.DELOREAN_PAGE},
          favicon:      'app/'+PL_CONFIG.DELOREAN_PAGE.plDomain+'/public/_images/branding/favicon.ico',
          inject:       false
      })
    ]
  });


  var staticTemplatesConfig = require('./webpack.config.static.js')(DOMAIN, ENV);

  if (STATIC_ONLY) {
    PL_CONFIG.DELOREAN_PAGE.plStatic = '/';
    module.exports = [staticTemplatesConfig];
  }
  else {
    module.exports = [mainConfig];
  }
}


if(ENV === 'prod') {

  var mainConfig = merge(common, {
    output: {
      publicPath: PL_CONFIG.DELOREAN_PAGE.plStatic
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
      new ExtractTextPlugin("styles.[name].[chunkhash].[id].css"),
      new htmlWebpackPlugin({
          template:     PATHS.app+'/single-page-app.ejs',
          appMountId:   'app',
          filename:     PATHS.templates+'/single-page-app.html',
          PL_DOMAIN:    PL_CONFIG.DELOREAN_PAGE.plDomain || '',
          PL_LABEL:     PL_CONFIG.DELOREAN_PAGE.plLabel || '',
          PL_STATIC:    PL_CONFIG.DELOREAN_PAGE.plStatic || '',
          PL_ID:        PL_CONFIG.DELOREAN_PAGE.plId || '',
          PL_DCSID:     PL_CONFIG.DELOREAN_PAGE.plDcsid || '',
          PL_ENV:       PL_CONFIG.DELOREAN_PAGE.plEnv || '',
          name:         PL_CONFIG.DELOREAN_PAGE.name || '',
          window:       {DELOREAN_PAGE:PL_CONFIG.DELOREAN_PAGE},
          favicon:      'app/'+PL_CONFIG.DELOREAN_PAGE.plDomain+'/public/_images/branding/favicon.ico',
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
  });


  var staticTemplatesConfig = require('./webpack.config.static.js')(DOMAIN, ENV);
  var ldeCssConfig = require('./webpack.config.resources.js');

  if (STATIC_ONLY) {
    module.exports = [staticTemplatesConfig, ldeCssConfig];
  }
  else if(MAIN_ONLY) {
    module.exports = [mainConfig];
  }
  else {
    module.exports = [mainConfig, staticTemplatesConfig, ldeCssConfig];
  }
}
