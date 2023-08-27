'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('karisma_salons', 'latitude', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('karisma_salons', 'longitude', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('karisma_salons', 'rating', {
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('karisma_salons', 'owner_review', {
      type: Sequelize.TEXT
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('karisma_salons', 'latitude');
    await queryInterface.removeColumn('karisma_salons', 'longitude');
    await queryInterface.removeColumn('karisma_salons', 'rating');
    await queryInterface.removeColumn('karisma_salons', 'owner_review');
  }
};
