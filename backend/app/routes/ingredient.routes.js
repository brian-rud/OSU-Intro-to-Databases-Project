module.exports = app => {
	const ingredients = require("../controllers/ingredient.controller")

	// Retrieve all ingredients
	app.get("/ingredients", ingredients.findAll);

	// Retrieve ingredient by ingredient_id
	app.get("/ingredients/:ingredientId", ingredients.findOne)

	// Add an ingredient
	app.post("/ingredients", ingredients.addOne);

	// Change a single ingredient
	app.put("/ingredients/:ingredientId", ingredients.updateOne);

	// Delete a single ingredient
	app.delete("/ingredients/:ingredientId", ingredients.deleteOne);

}
