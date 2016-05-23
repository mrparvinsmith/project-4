var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var db = require('./config/db');

var app = express();

app.use( express.static(path.join(__dirname + '/public')));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on ' + port);
});
