'use strict';
const values = require("../models/values/SalonType")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('karisma_salon_types', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('karisma_salon_types', null, {});
  }
};