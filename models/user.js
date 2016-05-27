var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  favorites: {
    routes: [{type: String}],
    stations: [{type: String}],

    //the basis of 'search-nears' like home or work
    bases:[{type: String}]
  }
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;
