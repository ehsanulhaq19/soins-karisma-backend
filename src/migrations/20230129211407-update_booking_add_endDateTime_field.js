'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('bookings', 'end_date_time', {
      type: Sequelize.DATE
    });
    await queryInterface.renameColumn('bookings', 'date_time', 'start_date_time');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('bookings', 'end_date_time');
    await queryInterface.renameColumn('bookings', 'start_date_time', 'date_time');
  }
};
