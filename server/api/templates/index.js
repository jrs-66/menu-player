'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./template.controller');

router.get('/:id', controller.template);

module.exports = router
