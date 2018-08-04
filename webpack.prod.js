const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  // optimization: {
  //   minimizer: [
  //     // we specify a custom UglifyJsPlugin here to get source maps in production
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       uglifyOptions: {
  //         // Eliminate comments
  //         comments: false,
  //         // Compression specific options
  //         compress: {
  //           // remove warnings
  //           warnings: false,
  //           // Drop console statements
  //           drop_console: true
  //         }
  //       },
  //     })
  //   ]
  // },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    }
  },
});
