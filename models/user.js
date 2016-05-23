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

userSchema.methods.validPassword = function(pwd){
  return bcrypt.compareSync(pwd, this.password);
};

userSchema.methods.encrypt = function(pwd){
  return bcrypt.hashSync(pwd, 8);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
