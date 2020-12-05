module.exports = app => {
	const recipeDiets = require("../controllers/recipe_ingredient.controller")

	// Retrieve all recipe_ingredients
	app.get("/recipeDiets", recipeDiets.findAll);

	// Retrieve all recipe_ingredients for a given recipe_id
	app.get("/recipeDiets/:recipeId", recipeDiets.findOne);

	// Add a recipe_ingredient
	app.post("/recipeDiets", recipeDiets.addOne);

	// // Modify an single recipe_ingredient
	// app.put("/recipeDiets/:recipeId/:ingredientId", recipeDiets.updateOne);

	// Delete a single recipe_ingredient
	app.delete("/recipeDiets/:recipeId/:ingredientId", recipeDiets.deleteOne);
}