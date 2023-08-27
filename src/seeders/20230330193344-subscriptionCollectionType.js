'use strict';
const values = require("../models/values/SubscriptionCollectionType")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscription_collection_types', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_collection_types', null, {});
  }
};