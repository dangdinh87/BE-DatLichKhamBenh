"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.Rate, { foreignKey: "patientId" });
      Patient.hasMany(models.Booking, { foreignKey: "patientId" });
      Patient.belongsTo(models.Account, { foreignKey: "accountId" });
    }
  }
  Patient.init(
    {
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      date: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN,
      patientHistory: DataTypes.STRING,
      image: DataTypes.STRING,
      accountId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
