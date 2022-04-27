process.env.NODE_ENV = 'development';

const cwd = process.cwd();
const path = require('path');
const open = require('opener');
const axios = require('axios');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackBaseConfig = require('./webpack.config.base');

const { APP_PORT, APP_PATH, APP_TARGET, NODE_ENV, BUILD_NUMBER } = process.env;
const isClient = ['client'].includes(APP_PATH);

module.exports = Object.assign({}, webpackBaseConfig, {
  mode: 'development',
  cache: {
    type: 'filesystem'
  },
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: APP_PORT,
    contentBase: [path.resolve(cwd, APP_PATH), isClient && path.resolve(__dirname, `../i18n/${APP_PATH}`)].filter(
      Boolean
    ),
    contentBasePublicPath: `/${APP_PATH}/`,
    publicPath: `/${APP_PATH}/`,
    headers: {
      'Service-Worker-Allowed': `/${APP_PATH}`
    },
    historyApiFallback: {
      index: `/${APP_PATH}/index.html`
    },
    hot: true,
    inline: true,
    watchOptions: {
      watch: true
    },
    proxy: [
      {
        context: ['/server'],
        target: APP_TARGET,
        logLevel: 'error',
        changeOrigin: true,
        cookieDomainRewrite: ''
      }
    ].filter(Boolean),
    disableHostCheck: true,
    compress: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false
    }),
    new ForkTsCheckerWebpackPlugin({
      formatter: 'basic',
      logger: {
        devServer: false
      },
      eslint: {
        files: ['./src/**/*.{ts,tsx}', '../core/**/*.{ts,tsx}']
      }
    }),
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
    })
  ].filter(Boolean)
});
