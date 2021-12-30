"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TimeSlot.hasMany(models.Booking, { foreignKey: "timeSlotId" });
      TimeSlot.belongsTo(models.Schedule, { foreignKey: "scheduleId" });
    }
  }
  TimeSlot.init(
    {
      timeSlotId: DataTypes.STRING,
      timeStart: DataTypes.STRING,
      timeStart: DataTypes.DATE,
      timeEnd: DataTypes.DATE,
      price: DataTypes.INTEGER,
      scheduleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TimeSlot",
    }
  );
  return TimeSlot;
};
