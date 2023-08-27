'use strict';
const values = require("../models/values/BusinessServiceRoomStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('business_service_room_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('business_service_room_statuses', null, {});
  }
};