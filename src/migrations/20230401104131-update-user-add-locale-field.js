'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'locale', {
      type: Sequelize.STRING(50)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'locale');
  }
};
