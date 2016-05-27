var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stationSchema = new Schema({
  stop_id: String,
  stop_code: String,
  stop_name: String,
  stop_desc: String,
  stop_lat: String,
  stop_lon: String,
  stop_url: String,
  location_type: String,
  parent_station: String,
  tpis_name: String,
  routes: [String]
});

var Station = mongoose.model('Station', stationSchema);

module.exports = Station;
