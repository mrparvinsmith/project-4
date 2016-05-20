var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use('/api/users', require('./routes.users'));

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on ' + port);
});
