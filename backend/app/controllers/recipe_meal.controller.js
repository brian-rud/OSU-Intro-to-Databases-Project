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

exports.findOne = (req, res) => {
	RecipeMeal.fetchOne(req.params, (err, data) => {
		console.log("RECIPE CUISINE ROUTE WORKED")
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeMeals"});

		else{

			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	})
}

exports.addOne = (req, res) => {
	RecipeMeal.addOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while adding a RecipeMeal"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			})
		}
	})
}

// exports.updateOne = (req, res) => {
// 	Object.assign(req.body, req.params);

// 	RecipeMeal.updateOne(req.body,(err, data) => {
// 		if (err) {
// 			return res.status(500).json({
// 				message: err.message || "An error occurred while updating an RecipeMeal"
// 			});
// 		}

// 		else {
// 			return res.status(200).json({
// 				affectedRows: data
// 			});
// 		}
// 	});
// }



exports.deleteOne = (req, res) => {
	Object.assign(req.body, req.params);
	console.log(req.body)
	RecipeMeal.deleteOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while deleting a RecipeMeal"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			});
		}
	})

}

