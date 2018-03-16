const webpack = require('webpack'),
    path = require('path');
 
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.glsl$/, use: 'webpack-glsl-loader'}
    ]
  }
};