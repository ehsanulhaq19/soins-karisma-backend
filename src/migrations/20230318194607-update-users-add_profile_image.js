'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'salon_image', 'profile_image');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'profile_image', 'salon_image');
  }
};
