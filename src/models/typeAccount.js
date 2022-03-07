"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeAccount.hasMany(models.Account, {
        foreignKey: "typeAccountId",
      });
    }
  }
  TypeAccount.init(
    {
      typeAccountName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TypeAccount",
    }
  );
  return TypeAccount;
};
