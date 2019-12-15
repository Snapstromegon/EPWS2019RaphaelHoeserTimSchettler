'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('Attacks', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Attacks',
      'UserId'
    );
  }
};
