'use strict';

module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    streetNumber: DataTypes.STRING,
    streetName: DataTypes.STRING,
    suburb: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    shoppingCentreId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Address.belongsTo(models.ShoppingCentre);
      }
    }
  });
  return Address;
};