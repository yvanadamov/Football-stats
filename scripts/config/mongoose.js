var mongoose = require('mongoose');

var config = require('./config').db;

var connection = mongoose.connect(config.connection);

module.exports = connection;