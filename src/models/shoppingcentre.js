'use strict';

module.exports = (sequelize, DataTypes) => {
  var ShoppingCentre = sequelize.define('ShoppingCentre', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        ShoppingCentre.hasOne(models.Address);
      }
    }
  });
  return ShoppingCentre;
};