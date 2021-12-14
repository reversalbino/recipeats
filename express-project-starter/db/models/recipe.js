'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    ratingId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsToMany(models.Board, {through: 'RecipesOnBoard', otherKey: 'boardId', foreignKey: 'recipeId'})
    Recipe.hasMany(models.Ingredient, {foreignKey: 'recipeId'})
    Recipe.hasMany(models.Instruction, {foreignKey: 'recipeId'})
    Recipe.hasMany(models.Review, {foreignKey: 'recipeId'})
    Recipe.hasMany(models.Rating, {foreignKey: 'ratingId'})
  };
  return Recipe;
};