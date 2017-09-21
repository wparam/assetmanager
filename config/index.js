const path  = require('path');
const _ = require('lodash');

module.exports = _.extend( require('./env/all'), require(`./env/${process.env.NODE_ENV}`) || {} );