var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var token = require('../controllers/token');

router.route('/')
  .get(token.verify, users.index)
  .post(users.create);

router.route('/:username')
  .get(token.verify, users.show)
  .put(token.verify, users.update)
  .delete(token.verify, users.destroy);

module.exports = router;
