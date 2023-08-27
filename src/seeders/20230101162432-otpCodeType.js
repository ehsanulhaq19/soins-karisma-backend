'use strict';
const otpCodeTypes = require("../models/values/OtpCodeType")


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('otp_code_types', Object.values(otpCodeTypes), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('otp_code_types', null, {});
  }
};
