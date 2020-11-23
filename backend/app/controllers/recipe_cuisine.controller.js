const RecipeCuisine = require("../models/recipe_cuisine.model.js");

exports.findAll = (req, res) => {
	RecipeCuisine.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeCuisines"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}	
	})
}