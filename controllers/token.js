var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'secret';
var controller = {};

controller.findUser = function(req, res, next){
  User.findOne({username: req.body.username})
    .then(function(user){
      if(!user){
        next({
          status: 401,
          message: 'Authentication failed: credentials incorrect'
        });
      }
      req.user = user;
      next();
    })
    .catch(function(err){
      next(err);
    });
};

controller.validateUser = function(req, res, next){
  req.user.verifyPassword(req.body.password, function(err, valid){
    console.log(err, valid);
    if(!valid){
      next({
        status: 401,
        message: 'Authentication failed: credentials incorrect'
      });
    } else {
      next();
    }
  });
};

controller.create = function(req, res, next){
  console.log('creating token');
  var token = jwt.sign({
    username: req.user.username
  }, secret);
  res.json({token: token, message: 'Hello ' + req.user.username});
};

controller.verify = function(req, res, next){
  var authHeader = req.get('Authorization');
  if(!authHeader){
    next({
      status: 401,
      message: 'Authentication failed: missing auth header'
    });
  }
  console.log('verifying token ', authHeader);
  var token = authHeader.split(' ')[1];
  jwt.verify(token, secret, function(err, decoded){
    if(err) return next(err);
    req.decoded = decoded;
    next();
  });
};

module.exports = controller;