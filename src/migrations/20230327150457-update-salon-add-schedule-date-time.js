'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('karisma_salons', 'from_time', {
      type: Sequelize.STRING(20)
    });
    await queryInterface.addColumn('karisma_salons', 'to_time', {
      type: Sequelize.STRING(20)
    });
    await queryInterface.addColumn('karisma_salons', 'from_day', {
      type: Sequelize.STRING(20)
    });
    await queryInterface.addColumn('karisma_salons', 'to_day', {
      type: Sequelize.STRING(20)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('karisma_salons', 'from_time');
    await queryInterface.removeColumn('karisma_salons', 'to_time');
    await queryInterface.removeColumn('karisma_salons', 'from_day');
    await queryInterface.removeColumn('karisma_salons', 'to_day');
  }
};
