module.exports = app => {
	const cuisines = require("../controllers/cuisine.controller")

	// Retrieve all cuisines
	app.get("/cuisines", cuisines.findAll);

	// Add cuisine
	app.post("/cuisines", cuisines.create);

	// Update cuisine
	app.put("/cuisines/:cuisineId", cuisines.updateOne);

	// Delete cuisine
	app.delete("/cuisines/:cuisineId", cuisines.deleteOne);
}
