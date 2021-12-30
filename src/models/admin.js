"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminManager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminManager.belongsTo(models.Account, { foreignKey: "accountId" });
    }
  }
  AdminManager.init(
    {
      adminId: DataTypes.STRING,
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
      accountId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdminManager",
    }
  );
  return AdminManager;
};
