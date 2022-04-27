const cwd = process.cwd();
const path = require('path');

require('dotenv').config({ path: path.resolve(cwd, '../../.env') });

module.exports = require('@packages/core/scripts/webpack.config.prod');
