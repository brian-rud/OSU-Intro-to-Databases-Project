const RecipeDiet = require("../models/recipe_diet.model.js");

exports.findAll = (req, res) => {
	RecipeDiet.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeDiets"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}	
	})
}

exports.findOne = (req, res) => {
	RecipeDiet.fetchOne(req.params, (err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving RecipeDiets"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	})
}

exports.addOne = (req, res) => {
	RecipeDiet.addOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while adding a RecipeDiet"
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

// 	RecipeDiet.updateOne(req.body,(err, data) => {
// 		if (err) {
// 			return res.status(500).json({
// 				message: err.message || "An error occurred while updating an RecipeDiet"
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
	RecipeDiet.deleteOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while deleting a RecipeDiet"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			});
		}
	})

}