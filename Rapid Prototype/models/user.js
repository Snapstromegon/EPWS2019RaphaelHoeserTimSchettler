const Sequelize = require('sequelize');
const argon2 = require('argon2');

module.exports = class User extends Sequelize.Model {
  verifyPassword(password) {
    return argon2.verify(this.password, password);
  }

  /**
   * Init Model
   * @param {Sequelize} sequelize
   * @param {Sequelize.DataTypes} DataTypes
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        score: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
      },
      {
        sequelize,
        hooks: {
          beforeCreate: async user => {
            user.password = await argon2.hash(user.password);
          },
          beforeUpdate: async user => {
            if (!user.password.startsWith('$argon2')) {
              user.password = await argon2.hash(user.password);
            }
          }
        }
      }
    );
  }

  static associate(db) {
    this.hasMany(db.Attack);
  }
};
