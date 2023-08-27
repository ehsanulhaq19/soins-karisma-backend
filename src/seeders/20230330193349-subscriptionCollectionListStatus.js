'use strict';
const values = require("../models/values/SubscriptionCollectionListStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscription_collection_list_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_collection_list_statuses', null, {});
  }
};