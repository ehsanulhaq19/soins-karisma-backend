'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('bookings', 'booker_name', {
      type: Sequelize.STRING(255)
    });
    await queryInterface.addColumn('bookings', 'booker_email', {
      type: Sequelize.STRING(255),
      validate: {
        isEmail: true,
      }
    });
    await queryInterface.addColumn('bookings', 'booker_phone', {
      type: Sequelize.STRING(255)
    });
    await queryInterface.addColumn('bookings', 'is_sms_alert', {
      type: Sequelize.BOOLEAN
    });
    await queryInterface.addColumn('bookings', 'is_email_alert', {
      type: Sequelize.BOOLEAN
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('bookings', 'booker_name');
    await queryInterface.removeColumn('bookings', 'booker_email');
    await queryInterface.removeColumn('bookings', 'booker_phone');
    await queryInterface.removeColumn('bookings', 'is_sms_alert');
    await queryInterface.removeColumn('bookings', 'is_email_alert');
  }
};
