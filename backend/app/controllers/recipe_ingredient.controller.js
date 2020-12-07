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

exports.findOne = (req, res) => {
	RecipeIngredient.fetchOne(req.params, (err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeIngredients"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	})
}

exports.addOne = (req, res) => {
	RecipeIngredient.addOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while adding a RecipeIngredient"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			})
		}
	})
}

exports.updateOne = (req, res) => {
	Object.assign(req.body, req.params);

	RecipeIngredient.updateOne(req.body,(err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while updating an RecipeIngredient"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			});
		}
	});
}



exports.deleteOne = (req, res) => {
	Object.assign(req.body, req.params);
	RecipeIngredient.deleteOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while deleting a RecipeIngredient"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			});
		}
	})

}