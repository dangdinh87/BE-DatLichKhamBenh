"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bookings", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
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
