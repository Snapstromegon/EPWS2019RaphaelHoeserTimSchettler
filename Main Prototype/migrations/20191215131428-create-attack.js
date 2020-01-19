'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attacker: {
        type: Sequelize.STRING
      },
      difficulty: {
        type: Sequelize.FLOAT
      },
      attacked: {
        type: Sequelize.DATE
      },
      responded: {
        type: Sequelize.DATE
      },
      responseQuality: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Attacks');
  }
};