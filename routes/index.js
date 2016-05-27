var express = require('express');
var router = express.Router();
var token = require('../controllers/token');
var controller = require('../controllers/stations');

router.get('/', function(req, res){
  res.render('index', {api_key: process.env.GOOGLE_MAPS_API_KEY});
});

router.post('/login', token.findUser, token.validateUser, token.create);

router.route('/update')
  .get(controller.edit)
  .put(controller.update);


module.exports = router;
