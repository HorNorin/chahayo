var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    javascript: './js/boot.js',
    html: './index.html'
  },
  output: {
    path: '../public',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
};
