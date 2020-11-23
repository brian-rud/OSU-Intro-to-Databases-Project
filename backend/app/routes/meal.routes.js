module.exports = app => {
	const meals = require("../controllers/meal.controller")

	// Retrieve all meals
	app.get("/meals", meals.findAll);

	// Retrieve a meal
	app.get("/meals/:mealId", meals.findOne);

	// Add a meal
	app.post("/meals", meals.addOne);

	// Update a meal
	app.put("/meals/:meal_id", meals.updateOne);

	// Delete a meal
	app.delete("/meals/:mealId", meals.deleteOne);
}


