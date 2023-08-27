'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('mshop_orders', 'tax_tvq', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('mshop_orders', 'tax_gst', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('mshop_orders', 'sub_total_amount', {
      type: Sequelize.DOUBLE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('mshop_orders', 'tax_tvq');
    await queryInterface.removeColumn('mshop_orders', 'tax_gst');
    await queryInterface.removeColumn('mshop_orders', 'sub_total_amount');
  }
};
