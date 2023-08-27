'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_subscriptions', 'tax_tvq', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('user_subscriptions', 'tax_gst', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('user_subscriptions', 'sub_total_amount', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('user_subscriptions', 'total_amount', {
      type: Sequelize.DOUBLE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_subscriptions', 'tax_tvq');
    await queryInterface.removeColumn('user_subscriptions', 'tax_gst');
    await queryInterface.removeColumn('user_subscriptions', 'sub_total_amount');
    await queryInterface.removeColumn('user_subscriptions', 'total_amount');
  }
};
