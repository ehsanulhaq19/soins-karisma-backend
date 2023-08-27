'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('mshop_orders', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('carts', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('mshop_orders', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('carts', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
