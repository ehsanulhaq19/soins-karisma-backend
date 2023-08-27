'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('user_subscriptions', 'tax_tvq', 'tax_qst');
    await queryInterface.addColumn('user_subscriptions', 'tax_pst', {
      type: Sequelize.DOUBLE
    });
    await queryInterface.addColumn('user_subscriptions', 'tax_hst', {
      type: Sequelize.DOUBLE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('user_subscriptions', 'tax_qst', 'tax_tvq');
    await queryInterface.removeColumn('user_subscriptions', 'tax_pst');
    await queryInterface.removeColumn('user_subscriptions', 'tax_hst');
  }
};
