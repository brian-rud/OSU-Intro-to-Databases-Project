module.exports = app => {
	const recipeIngredients = require("../controllers/recipe_ingredient.controller")

	// Retrieve all recipe_ingredients
	app.get("/recipeIngredients", recipeIngredients.findAll);

	// Retrieve all recipe_ingredients for a given recipe_id
	app.get("/recipeIngredients/:recipeId", recipeIngredients.findOne);

	// Add a recipe_ingredient
	app.post("/recipeIngredients", recipeIngredients.addOne);

	// Modify an single recipe_ingredient
	app.put("/recipeIngredients/:recipeId/:ingredientId", recipeIngredients.updateOne);

	// Delete a single recipe_ingredient
	app.delete("/recipeIngredients/:recipeId/:ingredientId", recipeIngredients.deleteOne);
}
