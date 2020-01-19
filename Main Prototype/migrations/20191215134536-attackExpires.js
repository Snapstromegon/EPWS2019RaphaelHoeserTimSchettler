'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Attacks', 'expires', Sequelize.DATE)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Attacks',
      'expires'
    );
  }
};
