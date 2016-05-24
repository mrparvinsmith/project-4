var express = require('express');
var router = express.Router();
var token = require('../controllers/token');

router.get('/', function(req, res){
  res.render('index');
});

router.post('/login', token.findUser, token.validateUser, token.create);

module.exports = router;
