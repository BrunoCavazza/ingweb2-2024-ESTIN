'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(sequelize.models.Library, {foreignKey: 'user_id'})
      
    }
  }
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    wallet_id: DataTypes.BIGINT,
    funds: DataTypes.BIGINT,
    status: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
