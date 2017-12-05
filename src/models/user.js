'use strict';
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.authenticate = function(username, password) {
    return User.findOne({where: {
      username:username,
    }}).then( (user) => {
      if( !user || !bcrypt.compareSync(password, user.password)){
        return Promise.reject('Invalid User');
      }
      return user;
    });

  };

  return User;
};