'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
 
    static associate(models) {
      user.hasMany(models.post, {
        foreignKey: 'user_id',
        as: 'posts',
      });
      user.hasMany(models.comment, {
        foreignKey: 'user_id',
        as: 'comments',
      });
    }
  };
  user.init({
    email: {type:DataTypes.STRING, validate:{notEmpty:true}},
    password: {type:DataTypes.STRING, validate:{notEmpty:true}},
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};