var express = require('express');
var router = express.Router();
var controller = require('../controllers/stations');

router.route('/')
  .get(controller.index);

router.route('/:id')
  .get(controller.show);

router.route('/update')
  .get(controller.edit)
  .put(controller.update);

module.exports = router;
