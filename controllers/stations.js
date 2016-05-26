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

// controller.gmap = function(req, res){
//   console.log('hitting');
//   var rightNow = new Date();
//   res.json({time: rightNow});
//   // var key = process.env.GOOGLE_MAPS_API_KEY;
//   // console.log('the key is ' + key);
//   // res.json({key: key});
// };

module.exports = controller;
