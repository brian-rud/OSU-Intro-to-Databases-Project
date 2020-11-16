module.exports = app => {
	const cuisines = require("../controllers/cuisine.controller")

	// Retrieve all cuisines
	app.get("/cuisines", cuisines.findAll);
}
