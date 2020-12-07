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

exports.findOne = (req, res) => {
	RecipeCuisine.fetchOne(req.params, (err, data) => {
		console.log("RECIPE CUISINE ROUTE WORKED")
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeCuisines"});

		else{

			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	})
}

exports.addOne = (req, res) => {
	RecipeCuisine.addOne(req.body, (err, data) => {
		if (err) {
			console.log("RECIPECUISINE BODY:", req.body)
			return res.status(500).json({
				message: err.message || "An error occurred while adding a RecipeCuisine"
			});
		}

		else {
			console.log("RECIPECUISINE BODY:", req.body)
			return res.status(200).json({
				affectedRows: data
			})
		}
	})
}

// exports.updateOne = (req, res) => {
// 	Object.assign(req.body, req.params);

// 	RecipeCuisine.updateOne(req.body,(err, data) => {
// 		if (err) {
// 			return res.status(500).json({
// 				message: err.message || "An error occurred while updating an RecipeCuisine"
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
	RecipeCuisine.deleteOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while deleting a RecipeCuisine"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			});
		}
	})

}

