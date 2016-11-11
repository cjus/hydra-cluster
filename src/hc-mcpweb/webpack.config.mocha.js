'use strict';

var path = require('path');

module.exports = {
  entry: ['./test/tests.webpack'],
  resolve: {
    root: [path.resolve(__dirname, 'src', 'app')],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: 'bundleTests.js',
    publicPath: ''
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'src', 'app')]
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: 'style!css!sass' },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [
          path.resolve(__dirname, 'test'),
          path.resolve(__dirname, 'src', 'app')
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file',
          'image-webpack'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
