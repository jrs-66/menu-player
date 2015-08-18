/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var app = express();
var server = require('http').createServer(app);

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('web:web@localhost:27017/menu');

// add db connection to request
app.use(function(req,res,next) {
  req.db = db;
  next();
});

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
