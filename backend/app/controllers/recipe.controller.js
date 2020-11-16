const Recipe = require("../models/recipe.model");

exports.findAll = (req, res) => {
	Recipe.fetchAll((err, data) => {
		if(err)
			res.status(500).send({
				message: err.message || "An error occurred while retrieving recipes"
			});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	})
}
