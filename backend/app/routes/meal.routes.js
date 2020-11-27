module.exports = app => {
	const meals = require("../controllers/meal.controller")

	// Retrieve all meals
	app.get("/meals", meals.findAll);

	// Add meal
	app.post("/meals", meals.create);

	// Update meal
	app.put("/meals/:mealId", meals.updateOne);

	// Delete meal
	app.delete("/meals/:mealId", meals.deleteOne);
}


