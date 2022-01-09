'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Admin.belongsTo(models.Account, { foreignKey: 'accountId' });
    }
  }
  Admin.init(
    {
      adminId: DataTypes.STRING,
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      accountId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Admin'
    }
  );
  return Admin;
};
