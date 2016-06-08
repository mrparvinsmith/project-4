var Station = require('../models/station');
var request = require('request');
var controller = {};

controller.index = function(req, res){
  Station.find({}, function(err, stations){
    if(err) throw err;
    res.json(stations);
  });
};

controller.show = function(req, res){
  Station.findOne({stop_id: req.params.id}, function(err, station){
    if(err) throw err;
    request('http://api.metro.net/agencies/lametro/stops/' + station.stop_id + '/routes/',
      function(error, response, body){
        if(error) throw error;
        res.json(JSON.parse(body).items);
      });
  });
};

controller.edit = function(req, res){
  res.render('edit');
};

controller.update = function(req, res){
  Station.findOne({stop_id: req.body.id}, function(err, station){
    console.log(req.body.id);
    console.log(req.body.route);
    station.routes.push(req.body.route);
    station.save(function(err){
      if(err) throw err;
      console.log(station);
      res.json(station);
    });
  });
};

module.exports = controller;
