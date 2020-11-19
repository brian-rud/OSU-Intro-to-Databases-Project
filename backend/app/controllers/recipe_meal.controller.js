const RecipeMeal = require("../models/recipe_meal.model.js");

exports.findAll = (req, res) => {
	RecipeMeal.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeMeals"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}	
	})
}