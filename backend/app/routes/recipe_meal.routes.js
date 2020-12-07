module.exports = app => {
	const recipeMeals = require("../controllers/recipe_meal.controller")

	// Retrieve all recipe_meals
	app.get("/recipeMeals", recipeMeals.findAll);

	// Retrieve all recipe_meals for a given recipe_id
	app.get("/recipeMeals/:recipeId", recipeMeals.findOne);

	// Add a recipe_meal
	app.post("/recipeMeals", recipeMeals.addOne);

	// // Modify an single recipe_meal
	// app.put("/recipeMeals/:recipeId/:mealId", recipeMeals.updateOne);

	// Delete a single recipe_meal
	app.delete("/recipeMeals/:recipeId/:mealId", recipeMeals.deleteOne);
}
