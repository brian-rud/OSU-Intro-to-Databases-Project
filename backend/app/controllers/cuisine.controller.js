const Cuisine = require('../models/cuisine.model');

exports.findAll = (req, res) => {
	Cuisine.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving Cuisines"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}

	})
}