'use strict';

module.exports = (sequelize, DataTypes) => {
  var ShoppingCentre = sequelize.define('ShoppingCentre', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  ShoppingCentre.associate = function(models) {
      ShoppingCentre.hasOne(models.Address);
  };

  ShoppingCentre.createWithAddress = function(attributes) {
    return ShoppingCentre.create(attributes,
      {include: [  sequelize.models.Address] }
    );
  };

  ShoppingCentre.findById = function(id) {
    return ShoppingCentre.findOne({
      where: {id:id},
      include: [sequelize.models.Address]
    });
  };

  return ShoppingCentre;
};