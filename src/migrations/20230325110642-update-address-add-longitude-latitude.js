'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('addresses', 'latitude', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('addresses', 'longitude', {
      type: Sequelize.DOUBLE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('addresses', 'latitude');
    await queryInterface.removeColumn('addresses', 'longitude');
  }
};
