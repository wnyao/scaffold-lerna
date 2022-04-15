process.env.APP_PATH = 'client';
process.env.APP_PORT = 8081;
process.env.APP_TARGET = 'http://127.0.0.1:8082';

module.exports = require('@packages/core/scripts/webpack.config.dev');
