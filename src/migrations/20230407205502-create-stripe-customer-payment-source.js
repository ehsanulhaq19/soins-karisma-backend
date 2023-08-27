'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stripe_customer_payment_sources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4
      },
      stripe_customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stripe_customers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      stripe_payment_source_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status_id: {
        allowNull: false,
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
    await queryInterface.dropTable('stripe_customer_payment_sources');
  }
};