// tricks to impletent correctly es6 import

// eslint-disable-next-line no-global-assign
require = require('esm')(module);
module.exports = require('./app');
