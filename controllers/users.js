var User = require('../models/user');
var controller = {};

controller.index = function(req, res){
  User.find({}, function(err, users){
    if(err) throw err;
    res.json(users);
  });
};

controller.create = function(req, res){
  User.findOne({username: req.body.username})
    .then(function(currentUser){
      if(currentUser){
        res.json({error: 'That user name is already taken.'});
      } else {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function(err){
          if (err) throw err;
          res.json(user);
        });
      }
    });
};

controller.show = function(req, res){
  User.findOne({username: req.params.username}, function(err, user){
    if(err) throw err;
    res.json(user);
  });
};

controller.update = function(req, res){
  User.findOne({username: req.params.username}, function(err, user){
    if(err) throw err;
    req.body.routes.forEach(function(route){
      user.favorites.routes.push(route);
    });
    req.body.stations.forEach(function(station){
      user.favorites.stations.push(station);
    });
    req.body.bases.forEach(function(base){
      user.favorites.bases.push(base);
    });
    // user.favorites.routes.push(req.body.routes);
    // user.favorites.stations.push(req.body.stations);
    // user.favorites.bases.push(req.body.bases);
    user.save(function(err){
      if(err) throw err;
      res.json(user);
    });
  });
};

controller.destroy = function(req, res){
  User.findOneAndRemove({username: req.params.username}, function(err){
    if(err) throw err;
    res.json({message: 'User deleted'});
  });
};

module.exports = controller;
