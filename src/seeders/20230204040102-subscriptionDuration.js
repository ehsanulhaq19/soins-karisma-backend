'use strict';
const subscriptionDurations = require("../models/values/SubscriptionDurations")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscription_durations', Object.values(subscriptionDurations), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_durations', null, {});
  }
};

