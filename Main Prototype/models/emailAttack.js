const Sequelize = require('sequelize');

/**
 * @class Attack
 * @extends Sequelize.Model
 * 
 * every Attack stored in the DB is stored with this model.
 * Maybe we need to add data specific to each Attack Type
 */
module.exports = class EmailAttack extends Sequelize.Model {

  /**
   * Init Model
   * @param {Sequelize} sequelize
   * @param {Sequelize.DataTypes} DataTypes
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        mailId: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  /**
   * This function is used by the Module instantiator to create associations
   * @param {Sequelize} db DB which gets instantiated
   */
  static associate(db) {
    this.belongsTo(db.Attack, { onDelete: 'cascade' });
  }
};
