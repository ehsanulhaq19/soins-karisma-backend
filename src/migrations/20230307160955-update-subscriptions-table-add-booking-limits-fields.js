'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('subscriptions', 'max_active_bookings_limit_per_day', {
      type: Sequelize.INTEGER
    });

    await queryInterface.addColumn('subscriptions', 'max_active_bookings_limit', {
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('subscriptions', 'max_active_bookings_limit_per_day');
    await queryInterface.removeColumn('subscriptions', 'max_active_bookings_limit');
  }
};
