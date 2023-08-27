'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('mshop_product_collection_lists', 'product_quantity', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('mshop_product_collection_lists', 'product_quantity');
  }
};
