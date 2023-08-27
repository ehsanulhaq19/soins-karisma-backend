'use strict';
const userStatus = require("../models/values/UserStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_statuses', Object.values(userStatus), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_statuses', null, {});
  }
};
