'use strict';
const values = require("../models/values/StripePaymentLogStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stripe_payment_log_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stripe_payment_log_statuses', null, {});
  }
};