/*
    ./webpack.config.js
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './dist/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
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
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.gql'],
  },
}
