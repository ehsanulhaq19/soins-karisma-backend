'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('bookings', 'status', 'status_id');
    await queryInterface.renameColumn('bookings', 'user_id', 'booker_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('bookings', 'status_id', 'status');
    await queryInterface.renameColumn('bookings', 'booker_id', 'user_id');
  }
};
