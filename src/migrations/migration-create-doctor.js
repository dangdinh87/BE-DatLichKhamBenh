'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Doctors', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      fullName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      workHistory: {
        type: Sequelize.TEXT
      },
      avatarImage: {
        type: Sequelize.STRING
      },
      clinicName: {
        type: Sequelize.STRING
      },
      clinicImage: {
        type: Sequelize.STRING
      },
      clinicAddress: {
        type: Sequelize.STRING
      },
      certificateImage: {
        type: Sequelize.STRING
      },
      licenseImage: {
        type: Sequelize.STRING
      },
      status: {
<<<<<<< HEAD
        type: Sequelize.ENUM('NOT_ACTIVE', 'PENDING', 'ACTIVE', 'CANCEL'),
      },
      numberOfPatientsExamined: {
        type: Sequelize.INTEGER,
=======
        type: Sequelize.ENUM('NOT_ACTIVE', 'PENDING', 'ACTIVE', 'CANCEL')
>>>>>>> b3ca96d27af29b085466559ea9cad2174da5620b
      },
      specialistId: {
        type: Sequelize.STRING
      },
      positionId: {
        type: Sequelize.STRING
      },
      accountId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Doctors');
  }
};
