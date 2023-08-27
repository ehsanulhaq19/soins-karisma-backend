'use strict';
const values = require("../models/values/BusinessServiceRoomChairStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('business_service_room_chair_statuses', Object.values(values), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('business_service_room_chair_statuses', null, {});
  }
};