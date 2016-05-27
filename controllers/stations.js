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

controller.edit = function(req, res){
  res.render('edit');
};

controller.updateAll = function(req, res){

};

module.exports = controller;
