'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //mshop_products
    await queryInterface.addColumn('mshop_products', 'benefits', {
      type: Sequelize.JSON
    });
    await queryInterface.addColumn('mshop_products', 'ingredients', {
      type: Sequelize.JSON
    });

    //mshop_product_collections
    await queryInterface.addColumn('mshop_product_collections', 'benefits', {
      type: Sequelize.JSON
    });
    await queryInterface.addColumn('mshop_product_collections', 'ingredients', {
      type: Sequelize.JSON
    });
  },

  async down (queryInterface, Sequelize) {
    //mshop_products
    await queryInterface.removeColumn('mshop_products', 'benefits');
    await queryInterface.removeColumn('mshop_products', 'ingredients');
    
    //mshop_product_collections
    await queryInterface.removeColumn('mshop_product_collections', 'benefits');
    await queryInterface.removeColumn('mshop_product_collections', 'ingredients');
  }
};
