'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'name', 'user_name');
    await queryInterface.addConstraint('users', {
      type: 'unique',
      name: 'unique_constraint_user_name',
      fields: ['user_name'],
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'unique_constraint_user_name');
    await queryInterface.renameColumn('users', 'user_name', 'name');
  }
};
