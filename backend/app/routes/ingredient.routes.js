module.exports = app => {
	const ingredients = require("../controllers/ingredient.controller")

	// Retrieve all ingredients
	app.get("/ingredients", ingredients.findAll);
}
