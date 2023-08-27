'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'type_id', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'type_id')
  }
};
