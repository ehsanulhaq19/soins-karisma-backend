'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('karisma_salons', 'status_id', {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('karisma_salons', 'type_id', {
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('karisma_salons', 'status_id');
    await queryInterface.removeColumn('karisma_salons', 'type_id');
  }
};
