module.exports = app => {
	const ingredients = require("../controllers/ingredient.controller")

	// Retrieve all experts
	app.get("/ingredients", ingredients.findAll);
}
