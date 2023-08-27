'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'group_id');
    await queryInterface.removeColumn('users', 'calling_code');
    await queryInterface.removeColumn('users', 'mobile_verified');
    await queryInterface.removeColumn('users', 'image');
    await queryInterface.removeColumn('users', 'contract');
    await queryInterface.removeColumn('users', 'avatar');
    await queryInterface.removeColumn('users', 'location');
    await queryInterface.removeColumn('users', 'rtl');
    await queryInterface.removeColumn('users', 'deleted_at');
    await queryInterface.removeColumn('users', 'country_id');
    await queryInterface.removeColumn('users', 'email_verified_at');
    await queryInterface.removeColumn('users', 'pro');
    await queryInterface.removeColumn('users', 'super_user');
    await queryInterface.removeColumn('users', 'site_id');
    await queryInterface.removeColumn('users', 'company');
    await queryInterface.removeColumn('users', 'vatid');
    await queryInterface.removeColumn('users', 'title');
    await queryInterface.removeColumn('users', 'address1');
    await queryInterface.removeColumn('users', 'address2');
    await queryInterface.removeColumn('users', 'address3');
    await queryInterface.removeColumn('users', 'postal');
    await queryInterface.removeColumn('users', 'city');
    await queryInterface.removeColumn('users', 'state');
    await queryInterface.removeColumn('users', 'lang_id');
    await queryInterface.removeColumn('users', 'telephone');
    await queryInterface.removeColumn('users', 'telefax');
    await queryInterface.removeColumn('users', 'website');
    await queryInterface.removeColumn('users', 'longitude');
    await queryInterface.removeColumn('users', 'latitude');
    await queryInterface.removeColumn('users', 'birthday');
    await queryInterface.removeColumn('users', 'editor');
    await queryInterface.removeColumn('users', 'professional');
    await queryInterface.removeColumn('users', 'identification');
    await queryInterface.removeColumn('users', 'fr_name');
    await queryInterface.removeColumn('users', 'admin_flag');
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
