const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackProdConfig = require('./webpack.config.prod');

module.exports = Object.assign({}, webpackProdConfig, {
  plugins: webpackProdConfig.plugins.concat([
    new BundleAnalyzerPlugin()
  ])
})