'use strict';
const values = require("../models/values/StripeCustomerPaymentSourceStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stripe_customer_payment_source_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stripe_customer_payment_source_statuses', null, {});
  }
};