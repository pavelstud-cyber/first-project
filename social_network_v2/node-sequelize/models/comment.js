"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "users",
      });
      comment.belongsTo(models.post, {
        foreignKey: "post_id",
        as: "posts",
      });
    }
  }
  comment.init(
    {
      post_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
