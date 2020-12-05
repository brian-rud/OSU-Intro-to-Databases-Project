module.exports = app => {
	const recipeCuisines = require("../controllers/recipe_cuisine.controller")

	// Retrieve all recipe_cuisines
	app.get("/recipeCuisines", recipeCuisines.findAll);

	// Retrieve all recipe_cuisines for a given recipe_id
	app.get("/recipeCuisines/:recipeId", recipeCuisines.findOne);

	// Add a recipe_cuisine
	app.post("/recipeCuisines", recipeCuisines.addOne);

	// // Modify an single recipe_cuisine
	// app.put("/recipeCuisines/:recipeId/:cuisineId", recipeCuisines.updateOne);

	// Delete a single recipe_cuisine
	app.delete("/recipeCuisines/:recipeId/:cuisineId", recipeCuisines.deleteOne);
}
