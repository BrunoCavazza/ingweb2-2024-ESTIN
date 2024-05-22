'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GamesToLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GamesToLibrary.init({
    library_id: DataTypes.BIGINT,
    game_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'GamesToLibrary',
  });
  return GamesToLibrary;
};