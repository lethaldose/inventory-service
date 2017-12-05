'use strict';
module.exports = (sequelize, DataTypes) => {
  var AuditLog = sequelize.define('AuditLog', {
    userId: DataTypes.INTEGER,
    oldAttributes: DataTypes.JSONB,
    newAttributes: DataTypes.JSONB,
    entityType: DataTypes.STRING
  });

  const createWithAttrs = function(userId, oldAttributes,
   newAttributes, entityType) {
    if(!userId) return;

    let attributes = {
      userId: userId,
      oldAttributes: oldAttributes,
      newAttributes: newAttributes,
      entityType: entityType
    };

    AuditLog.create(attributes);
    return;
  };

  AuditLog.updateAsset = function(userId, oldAttributes, newAttributes) {
    createWithAttrs(userId, oldAttributes, newAttributes, 'Asset');
    return;
  };

  AuditLog.updateShoppingCentre = function(userId, oldAttributes, newAttributes) {
    createWithAttrs(userId, oldAttributes, newAttributes, 'ShoppingCentre');
    return;
  };
  return AuditLog;
};