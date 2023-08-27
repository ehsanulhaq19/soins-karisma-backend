'use strict';
const values = require("../models/values/ProductCollectionStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mshop_product_collection_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mshop_product_collection_statuses', null, {});
  }
};