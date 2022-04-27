process.env.NODE_ENV = 'production';

const cwd = process.cwd();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack.config.base');

const { APP_PATH, NODE_ENV, BUILD_NUMBER } = process.env;
const i18nResources = path.resolve(__dirname, `../i18n/${APP_PATH}/locales`);

module.exports = Object.assign({}, webpackBaseConfig, {
  mode: 'production',
  cache: {
    type: 'filesystem'
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_PATH: JSON.stringify(APP_PATH),
      NODE_ENV: JSON.stringify(NODE_ENV),
      BUILD_NUMBER: JSON.stringify(BUILD_NUMBER || '0000')
    }),
    new webpack.ProvidePlugin({
      i18n: ['i18next', 'default']
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new HtmlWebpackPlugin({
      title: '',
      template: path.resolve(cwd, 'src/index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: i18nResources,
          to: 'locales'
        }
      ]
    })
  ]
});
