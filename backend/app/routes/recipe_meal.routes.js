module.exports = app => {
	const recipeMeals = require("../controllers/recipe_meal.controller")

	// Retrieve all recipe_meals
	app.get("/recipeMeals", recipeMeals.findAll);
}
