'use strict';

/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize').QueryInterface} QueryInterface
 */

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Raphael',
        lastName: 'Höser',
        email: 'raphael@hoeser.info',
        score: 0,
        password: '$argon2i$v=19$m=1024,t=1,p=1$c2FqbmdzYWpuZ2FqbnJmMw$VDejBTWR7df8vjeLTQjLSUe4s90VjZvb6QHM6Eggoz4',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
