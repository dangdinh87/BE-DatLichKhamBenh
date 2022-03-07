'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      dateBooking: {
        type: Sequelize.STRING,
      },
      reasonExamination: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          'UNCONFIRMED',
          'CONFIRMED',
          'COMPLETED',
          'CANCELED'
        ),
      },
      patientId: {
        type: Sequelize.STRING,
      },
      timeSlotId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  },
};
