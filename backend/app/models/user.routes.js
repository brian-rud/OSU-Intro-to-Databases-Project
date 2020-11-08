module.exports = app => {
	const users = require("../controllers/user.controller")

	// Retrieve all experts
	app.get("/users", users.findAll);
}
