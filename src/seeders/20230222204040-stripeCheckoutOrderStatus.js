'use strict';
const values = require("../models/values/StripeCheckoutOrderStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stripe_checkout_order_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stripe_checkout_order_statuses', null, {});
  }
};