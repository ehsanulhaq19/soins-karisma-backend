'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(191)
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
      },
      calling_code: {
        type: Sequelize.STRING(191)
      },
      mobile: {
        type: Sequelize.STRING(191)
      },
      mobile_verified: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(191)
      },
      salon_image: {
        type: Sequelize.STRING(191)
      },
      contract: {
        type: Sequelize.STRING(191)
      },
      phone: {
        type: Sequelize.STRING(191)
      },
      avatar: {
        type: Sequelize.STRING(191)
      },
      location: {
        type: Sequelize.STRING(191)
      },
      last_seen: {
        type: Sequelize.DATE
      },
      remember_token: {
        type: Sequelize.STRING(100)
      },
      rtl: {
        type: Sequelize.BOOLEAN
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      country_id: {
        type: Sequelize.INTEGER
      },
      email_verified_at: {
        type: Sequelize.DATE
      },
      pro: {
        type: Sequelize.BIGINT
      },
      super_user: {
        type: Sequelize.BOOLEAN
      },
      site_id: {
        type: Sequelize.INTEGER
      },
      salutation: {
        type: Sequelize.STRING(8)
      },
      company: {
        type: Sequelize.STRING(100)
      },
      vatid: {
        type: Sequelize.STRING(32)
      },
      title: {
        type: Sequelize.STRING(64)
      },
      first_name: {
        type: Sequelize.STRING(64)
      },
      last_name: {
        type: Sequelize.STRING(64)
      },
      address1: {
        type: Sequelize.STRING(200)
      },
      address2: {
        type: Sequelize.STRING(200)
      },
      address3: {
        type: Sequelize.STRING(200)
      },
      postal: {
        type: Sequelize.STRING(16)
      },
      city: {
        type: Sequelize.STRING(200)
      },
      state: {
        type: Sequelize.STRING(200)
      },
      lang_id: {
        type: Sequelize.INTEGER
      },
      telephone: {
        type: Sequelize.STRING(32)
      },
      telefax: {
        type: Sequelize.STRING(32)
      },
      website: {
        type: Sequelize.STRING(255)
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      birthday: {
        type: Sequelize.DATE
      },
      editor: {
        type: Sequelize.STRING(255)
      },
      professional: {
        type: Sequelize.STRING(255)
      },
      identification: {
        type: Sequelize.BIGINT
      },
      fr_name: {
        type: Sequelize.TEXT
      },
      admin_flag: {
        type: Sequelize.INTEGER
      },
      enable_two_factor_authentication: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('users');
  }
};