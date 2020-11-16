const Ingredient = require('../models/ingredient.model');

exports.findAll = (req, res) => {
	Ingredient.fetchAll((err, data) => {

		if(err) {
			res.status(500).send({
				message: err.message || "An error occurred while retrieving ingredients"});
		}
    
		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	});

}

exports.addOne = (req, res) => {
	Ingredient.addOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while adding an ingredient"
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

	Ingredient.updateOne(req.body,(err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while updating an ingredient"
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

	Ingredient.deleteOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while deleting an ingredient"
			});
		}

		else {
			return res.status(200).json({
				affectedRows: data
			});
		}
	})

}