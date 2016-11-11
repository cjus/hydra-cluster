'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLTemplatePlugin = require('./src/html-template-plugin');
// var SvgStore = require('webpack-svgstore-plugin');

let browserDefinition = {
  browsers: [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Safari >= 7'
  ]
};
let cssLoader = 'css?-autoprefixer&importLoaders=1';
let autoprefixerLoader = `autoprefixer?${JSON.stringify(browserDefinition)}`;
let sassLoader = 'sass';

let styleLoaderPath = `${cssLoader}!${autoprefixerLoader}!${sassLoader}`;

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      './src/app/index'
    ],
    vendor: [
      './src/app/vendor'
    ]
  },
  resolve: {
    root: [path.resolve(__dirname, 'src', 'app')],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'b[chunkhash].js',
    publicPath: ''
  },
  plugins: [
    new HTMLTemplatePlugin({
      data: {
        title: 'MCP'
      },
      template: 'src/index.template.html'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'v[chunkhash].js'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin('[contenthash].css', {
      allChunks: true
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])
    // new SvgStore(path.join(__dirname, 'src', 'app', 'images', 'icons', '**/*.svg'), '', {
    //   name: '[hash].svg',
    //   chunk: 'app',
    //   prefix: '',
    //   svgoOptions: {
    //     plugins: [
    //       {
    //         removeUselessStrokeAndFill: false
    //       }
    //     ]
    //   }
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.resolve(__dirname, 'src', 'app')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', styleLoaderPath)
      },
      {
        test: /.*\.(gif|png|jpe?g|svg|ico)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.md$/,
        loader: 'raw'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src', 'app'),
      path.resolve(__dirname, 'node_modules', 'normalize-scss', 'sass'),
      path.resolve(__dirname, 'node_modules', 'normalize-scss', 'node_modules', 'support-for', 'sass')
    ]
  }
};
