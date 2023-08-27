'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('karisma_salons', 'subdomain',{
      type: Sequelize.STRING,
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('karisma_salons', 'subdomain');
  }
};
