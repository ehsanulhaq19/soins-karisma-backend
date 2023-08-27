'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('karisma_salons', {
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
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      mobile_phone: {
        type: Sequelize.STRING
      },
      other_email: {
        type: Sequelize.STRING
      },
      no_of_salons: {
        type: Sequelize.INTEGER
      },
      describe_salon: {
        type: Sequelize.TEXT
      },
      no_of_chairs: {
        type: Sequelize.INTEGER
      },
      no_of_employees: {
        type: Sequelize.INTEGER
      },
      services_provide: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.TEXT
      },
      approx_monthly_revenue: {
        type: Sequelize.TEXT
      },
      site_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('karisma_salons');
  }
};