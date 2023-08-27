'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint('cart_items', {
        type: 'foreign key',
        name: 'cart_id_fkey',
        fields: ['cart_id'],
        references: {
          table: 'carts',
          field: 'id',
        },
        onDelete: 'CASCADE',
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'cart_items',
        'cart_id_fkey',
        { transaction }
      );
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};