module.exports = app => {
	const recipeIngredients = require("../controllers/recipe_ingredient.controller")

	// Retrieve all recipe_ingredients
	app.get("/recipeIngredients", recipeIngredients.findAll);
}
