const Sequelize = require('sequelize');

// argon2 for strong password encryption
const argon2 = require('argon2');

/**
 * @class User
 * @extends Sequelize.Model
 * 
 * Model for a simple user in the system
 */
module.exports = class User extends Sequelize.Model {

  /**
   * This function checks if a provided password matches the stored password for this user
   * @param {String} password to test
   * @returns {Promise<boolean>} Returns true, if the password matches
   */
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
          // the hooks ensure, that the password is always hashed and never stored in clear text
          beforeCreate: async user => {
            user.password = await argon2.hash(user.password);
          },
          beforeUpdate: async user => {
            // don't hash the password, if the provided password is already hashed
            if (!user.password.startsWith('$argon2')) {
              user.password = await argon2.hash(user.password);
            }
          }
        }
      }
    );
  }

  /**
   * This function is used by the Module instantiator to create associations
   * @param {Sequelize} db DB which gets instantiated
   */
  static associate(db) {
    this.hasMany(db.Attack);
  }
};
