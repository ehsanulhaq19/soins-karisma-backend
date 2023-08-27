'use strict';
const values = require("../models/values/BookingStatusDetailType")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('booking_status_detail_types', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('booking_status_detail_types', null, {});
  }
};