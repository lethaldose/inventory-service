'use strict';

module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    streetNumber: DataTypes.STRING,
    streetName: DataTypes.STRING,
    suburb: DataTypes.STRING,
    postCode: DataTypes.INTEGER,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Address.belongsTo(models.ShoppingCentre);
      }
    }
  });
  return Address;
};