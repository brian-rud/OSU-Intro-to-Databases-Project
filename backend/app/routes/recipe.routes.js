module.exports = app => {
	const recipes = require("../controllers/recipe.controller")

	// Retrieve all experts
	app.get("/recipes", recipes.findAll);
}
