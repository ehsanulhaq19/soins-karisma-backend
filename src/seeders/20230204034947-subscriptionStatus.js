'use strict';
const subscriptionStatus = require("../models/values/SubscriptionStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscription_statuses', Object.values(subscriptionStatus), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_statuses', null, {});
  }
};
