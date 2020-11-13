const Diet = require('../models/diet.model');

exports.findAll = (req, res) => {
	Diet.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving Diets"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}

	})
}