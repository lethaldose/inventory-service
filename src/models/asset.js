'use strict';
module.exports = (sequelize, DataTypes) => {
  var Asset = sequelize.define('Asset', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    dimensions: DataTypes.JSONB,
    location: DataTypes.JSONB
  });

  Asset.associate = function(models) {
    Asset.belongsTo(models.ShoppingCentre);
  };

  Asset.findById = function(id) {
    return Asset.findOne({where: {id:id}});
  };

  Asset.findByShoppingCentreId = function(id) {
    return Asset.findAll({ where: {ShoppingCentreId:id}});
  };
  return Asset;
};