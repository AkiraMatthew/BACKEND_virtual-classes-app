'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Backend', position: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Frontend', position: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Extra tools', position: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'Soft-skills', position: 4, created_at: new Date(), updated_at: new Date() },
      { name: 'Carrier', position: 5, created_at: new Date(), updated_at: new Date() },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  }
};
