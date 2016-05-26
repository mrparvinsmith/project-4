var Station = require('../models/station');
var controller = {};

controller.index = function(req, res){
  Station.find({}, function(err, stations){
    if(err) throw err;
    res.json(stations);
  });
};

controller.show = function(req, res){
  Station.find({stop_id: req.params.id}, function(err, station){
    if(err) throw err;
    res.json(station);
  });
};

module.exports = controller;
