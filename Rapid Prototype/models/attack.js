const Sequelize = require('sequelize');

module.exports = class Attack extends Sequelize.Model {

  /**
   * Init Model
   * @param {Sequelize} sequelize
   * @param {Sequelize.DataTypes} DataTypes
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        attacker: DataTypes.STRING,
        difficulty: DataTypes.FLOAT,
        attacked: DataTypes.DATE,
        responded: DataTypes.DATE,
        responseQuality: DataTypes.FLOAT
      },
      {
        sequelize
      }
    );
  }

  static associate(db) {
    this.belongsTo(db.User);
  }
};
