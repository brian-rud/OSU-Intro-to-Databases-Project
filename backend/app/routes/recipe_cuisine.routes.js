module.exports = app => {
	const recipeCuisines = require("../controllers/recipe_cuisine.controller")

	// Retrieve all recipe_cuisines
	app.get("/recipeCuisines", recipeCuisines.findAll);
}
