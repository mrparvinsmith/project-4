// var fs = require('fs');
// var parse = require('csv-parse');

// var csvData=[];
// fs.createReadStream('./data/stops.txt')
//     .pipe(parse({delimiter: ':'}))
//     .on('data', function(csvrow) {
//         console.log(csvrow);
//         //do something with csvrow
//         csvData.push(csvrow);
//     })
//     .on('end',function() {
//       //do something wiht csvData
//       console.log(csvData);
//     });

fs = require('fs');
parse = require('csv-parse');

// Using the first line of the CSV data to discover the column names
rs = fs.createReadStream('./data/stops.txt');
parser = parse({columns: true}, function(err, data){
  console.log(data);
});
rs.pipe(parser);
