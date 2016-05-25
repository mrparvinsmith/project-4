var db = require('./config/db');
var Station = require('./models/station');
var fs = require('fs');
var parse = require('csv-parse');

Station.remove({})
    // .then(function(){
    //     console.log('ending');
    //     return;
    // })
    .then(function(){
        var holder = [];

        // Using the first line of the CSV data to discover the column names
        var rs = fs.createReadStream('./data/stops.txt');
        var parser = parse({columns: true}, function(err, data){
            console.log('parsing');
            console.log(data.length);
            holder = data;
            console.log(data[5]);
            Station.create(holder, function(err, stations){
                console.log(stations);
                process.exit();
            });
        });
        return rs.pipe(parser);
    });
