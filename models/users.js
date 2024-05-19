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
      // define association here
    }
  }
  Users.init({
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    wallet_id: DataTypes.BIGINT,
    funds: DataTypes.BIGINT,
    status: DataTypes.BIGINT,
    library_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};