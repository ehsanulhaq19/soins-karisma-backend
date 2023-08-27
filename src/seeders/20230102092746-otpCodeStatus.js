'use strict';
const otpCodeStatuses = require("../models/values/OtpCodeStatus")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('otp_code_statuses', Object.values(otpCodeStatuses), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('otp_code_statuses', null, {});
  }
};
