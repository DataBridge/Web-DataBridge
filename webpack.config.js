/*
    ./webpack.config.js
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './dist/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',
 devServer: {
    compress: true,
    disableHostCheck: true,   // That solved it
    historyApiFallback: true,
 } ,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader'],},
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      }
    ]
  },
	plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env.DATABRIDGE_HUB_GRAPHQL': JSON.stringify(process.env.DATABRIDGE_HUB_GRAPHQL)
    }),
    new webpack.DefinePlugin({
      'process.env': {
      'NODE_ENV': "'production'",
    }}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new UglifyJsPlugin(),
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.gql'],
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    },
  },
}
