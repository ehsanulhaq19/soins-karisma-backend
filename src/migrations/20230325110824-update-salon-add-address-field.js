'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('karisma_salons', 'address_id', {
      type: Sequelize.DOUBLE
    });
    await queryInterface.removeColumn('karisma_salons', 'latitude');
    await queryInterface.removeColumn('karisma_salons', 'longitude');
    await queryInterface.removeColumn('karisma_salons', 'location');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('karisma_salons', 'address_id');
    await queryInterface.addColumn('karisma_salons', 'latitude', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('karisma_salons', 'longitude', {
      type: Sequelize.DOUBLE
    });
    await queryInterface.addColumn('karisma_salons', 'location', {
      type: Sequelize.TEXT
    });
  }
};
