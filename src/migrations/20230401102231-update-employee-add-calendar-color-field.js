'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('employees', 'calendar_color', {
      type: Sequelize.STRING(50)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('employees', 'calendar_color');
  }
};
