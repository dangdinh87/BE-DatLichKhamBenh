'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Rate.belongsTo(models.Doctor)
      Rate.belongsTo(models.Patient, { foreignKey: 'patientId' });
      Rate.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
    }
  }
  Rate.init(
    {
      content: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Rate'
    }
  );
  return Rate;
};
