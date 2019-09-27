const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const secret = require('../helper/config');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');


const userSchema = new Schema({
    email: String,
    password: String,
    token: String
});

userSchema.pre('save', function(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      if(err) return next(err)
      user.password = hash;
      user.token = user.generateToken();
      next()
    });
  });
  
  userSchema.methods.comparePassword = function(plainPassword, done) {
    let user = this
    bcrypt.compare(plainPassword, user.password).then(function(res) {
      done(res);
    });
  };
  
  userSchema.methods.generateToken = function() {
    let user = this;
    delete user.password;
    let token = jwt.sign({email: user.email}, secret.secret);
    
    return token;
  };
  
  userSchema.statics.decodeToken = function(token) {
    return jwt.verify(token, secret.secret);
  };



module.exports = mongoose.model('users', userSchema);