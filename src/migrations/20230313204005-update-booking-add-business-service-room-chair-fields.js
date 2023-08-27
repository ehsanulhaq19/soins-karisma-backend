'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('bookings', 'booking_type', 'type_id');
    await queryInterface.addColumn('bookings', 'business_service_room_id', {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('bookings', 'business_service_room_chair_id', {
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('bookings', 'type_id', 'booking_type');
    await queryInterface.removeColumn('bookings', 'business_service_room_id');
    await queryInterface.removeColumn('bookings', 'business_service_room_chair_id');
  }
};
