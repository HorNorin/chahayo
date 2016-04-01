var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    javascript: './js/boot.js',
    html: './index.html',
    css: './main.css'
  },
  output: {
    path: '../public',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /(\.html|\.css)$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      React: 'react'
    }),
    new CopyWebpackPlugin([
      { from: 'img/*', to: '../public/img/' }
    ]),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('main')
    ])
  ],
  resolve: {
    root: [path.join(__dirname, './js')]
  }
};
