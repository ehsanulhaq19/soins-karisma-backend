'use strict';
const values = require("../models/values/StripeSubscriptionProductStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stripe_subscription_product_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stripe_subscription_product_statuses', null, {});
  }
};

