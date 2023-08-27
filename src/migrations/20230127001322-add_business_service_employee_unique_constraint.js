'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('business_service_employees', {
      fields: ['business_service_id', 'employee_id'],
      type: 'unique',
      name: 'business_service_employee_unique_constraint'
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('business_service_employees', 'business_service_employee_unique_constraint')
  }
};
