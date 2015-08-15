'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./player.controller');

router.get('/check/:playerid/:modelid', controller.player());


module.exports = router
