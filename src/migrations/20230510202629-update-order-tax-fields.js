'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('mshop_orders', 'tax_tvq', 'tax_qst');
    await queryInterface.addColumn('mshop_orders', 'tax_pst', {
      type: Sequelize.DOUBLE
    });
    await queryInterface.addColumn('mshop_orders', 'tax_hst', {
      type: Sequelize.DOUBLE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('mshop_orders', 'tax_qst', 'tax_tvq');
    await queryInterface.removeColumn('mshop_orders', 'tax_pst');
    await queryInterface.removeColumn('mshop_orders', 'tax_hst');
  }
};
