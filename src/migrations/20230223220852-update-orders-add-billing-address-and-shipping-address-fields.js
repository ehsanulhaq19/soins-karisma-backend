'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('mshop_orders', 'shipping_address_id', {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('mshop_orders', 'billing_address_id', {
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('mshop_orders', 'shipping_address_id');
    await queryInterface.removeColumn('mshop_orders', 'billing_address_id');
  }
};
