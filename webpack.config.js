const webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'prod';
const env = debug ? 'dev' : 'prod';

module.exports = require(`./webpack.${env}.js`);
