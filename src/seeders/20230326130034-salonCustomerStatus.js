'use strict';
const values = require("../models/values/SalonCustomerStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salon_customer_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salon_customer_statuses', null, {});
  }
};