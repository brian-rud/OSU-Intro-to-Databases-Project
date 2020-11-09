const User = require('../models/user.model');

// Find all experts from the database
exports.findAll = (req,res) => {
	User.fetchAll((err, data) => {
		if(err)
			res.status(500).send({
				message: err.message || "An error occurred while retrieving users"
			})

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	});
}