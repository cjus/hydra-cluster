'use strict';

var path = require('path');
var webpack = require('webpack');
var NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
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
let styleLoader = 'style';
let cssLoader = 'css?sourceMap&importLoaders=1';
let autoprefixerLoader = `autoprefixer?${JSON.stringify(browserDefinition)}`;
let sassLoader = 'sass?sourceMap';

let styleLoaderPath = `${styleLoader}!${cssLoader}!${autoprefixerLoader}!${sassLoader}`;

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
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HTMLTemplatePlugin({
      data: {
        title: 'MCP'
      },
      template: 'src/index.template.html'
    }),
    new NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])
    // new SvgStore(path.join(__dirname, 'src', 'app', 'images', 'icons', '**/*.svg'), '', {
    //   name: '[hash].sprite.svg',
    //   chunk: 'app',
    //   prefix: '',
    //   baseUrl: '',
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
        loader: styleLoaderPath
      },
      {
        test: /.*\.(gif|png|jpe?g|svg|ico)$/i,
        loaders: [
          'file',
          'image-webpack'
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
