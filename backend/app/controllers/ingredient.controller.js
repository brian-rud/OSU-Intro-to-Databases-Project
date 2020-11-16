const Ingredient = require('../models/ingredient.model');

exports.findAll = (req, res) => {
	Ingredient.fetchAll((err, data) => {
		if(err)
			res.status(500).send({
				message: err.message || "An error occurred while retrieving users"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	});
		
}