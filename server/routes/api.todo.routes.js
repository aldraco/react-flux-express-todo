var express = require('express');
var controller = require('../controllers/todo.controller');

var router = express.Router();

// todo routes API

router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/:todo_id')
  .get(controller.show);

module.exports = router;