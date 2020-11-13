module.exports = app => {
	const recipes = require("../controllers/recipe.controller")

	// Retrieve all recipes
	app.get("/recipes", recipes.findAll);

	// Retrieve a recipe
	app.get("/recipes/:recipeId", recipes.findOne);

	// Add a recipe
	app.post("/recipes", recipes.addOne);

	// Update a recipe
	app.put("/recipes/:recipe_id", recipes.updateOne);

	// Delete a recipe
	app.delete("/recipes/:recipeId", recipes.deleteOne);
}
