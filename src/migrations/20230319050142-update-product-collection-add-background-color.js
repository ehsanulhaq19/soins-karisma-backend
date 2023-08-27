'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('mshop_product_collections', 'background_color', {
      type: Sequelize.STRING(50)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('mshop_product_collections', 'background_color');
  }
};
