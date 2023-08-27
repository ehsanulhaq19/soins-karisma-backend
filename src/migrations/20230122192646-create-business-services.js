'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('business_services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(191)
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING
      },
      time_type: {
        type: Sequelize.STRING(191)
      },
      discount: {
        type: Sequelize.STRING
      },
      discount_type: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      default_image: {
        type: Sequelize.STRING(191)
      },
      status: {
        type: Sequelize.INTEGER
      },
      salon_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      service_type: {
        type: Sequelize.INTEGER
      },
      fr_name: {
        type: Sequelize.STRING
      },
      fr_description: {
        type: Sequelize.STRING
      },
      fr_time_type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('business_services');
  }
};