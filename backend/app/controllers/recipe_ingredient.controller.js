const RecipeIngredient = require("../models/recipe_ingredient.model.js");

exports.findAll = (req, res) => {
	RecipeIngredient.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeIngredients"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}	
	})
}