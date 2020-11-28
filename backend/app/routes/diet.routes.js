module.exports = app => {
	const diets = require('../controllers/diet.controller.js');

	// Retrieve all diets
	app.get("/diets", diets.findAll);

	// Add a diet
	app.post("/diets", diets.create);

	// Update a diet
	app.put("/diets/:dietId", diets.updateOne);

	// Delete a diet
	app.delete("/diets/:dietId", diets.deleteOne);
}