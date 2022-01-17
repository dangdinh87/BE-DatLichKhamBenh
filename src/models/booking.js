'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Patient, { foreignKey: 'patientId' });
      Booking.belongsTo(models.TimeSlot, { foreignKey: 'timeSlotId' });
    }
  }
  Booking.init(
    {
      dateBooking: DataTypes.STRING,
      reasonExamination: DataTypes.STRING,
      status: DataTypes.ENUM('BOOKED', 'COMPLETED', 'CANCELED'),
      patientId: DataTypes.STRING,
      timeSlotId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
