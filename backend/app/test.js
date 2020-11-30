const RecipeIngredient = require("./app/models/recipe_ingredient.model.js");

RecipeIngredient.fetchOne({recipeId: 3}, () => 1);