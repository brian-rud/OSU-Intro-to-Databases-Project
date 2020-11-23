module.exports = app => {
	const diets = require('../controllers/diet.controller.js');

	app.get("/diets", diets.findAll);

	app.post("/diets", diets.create)
}