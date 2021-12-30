"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bookings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      bookingId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      dateBooking: {
        type: Sequelize.DATE,
      },
      reasonExamination: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      patientId: {
        type: Sequelize.STRING,
      },
      timeSlotId: {
        type: Sequelize.STRING,
      },
      timeType: {
        type: Sequelize.STRING,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};
