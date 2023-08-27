'use strict';
const values = require("../models/values/StripeSubscriptionPriceStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stripe_subscription_price_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stripe_subscription_price_statuses', null, {});
  }
};

