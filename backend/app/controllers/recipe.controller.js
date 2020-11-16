const Recipe = require("../models/recipe.model");

exports.findAll = (req, res) => {
	Recipe.fetchAll((err, data) => {

		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while retrieving recipes"
			});
		}

		else {
			return res.status(200).json({ data });
		}
	});
}

exports.findOne = (req, res) => {
	Object.assign(req.body, req.params);

	Recipe.fetchOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while retrieving a recipe"
			});
		}

		else {
			return res.status(200).json({ data });
		}
	})
}

exports.addOne = (req, res) => {
	Recipe.addOne(req.body,(err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while adding a recipe"
			});
		}

		else {
			return res.status(200).json({ affected_rows: data });
		}
	})
}

exports.updateOne = (req, res) => {
	Recipe.updateOne(req.body, req.params, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while updating a recipe"
			});
		}

		else {
			return res.status(200).json({ affectedRows: data });
		}
	});
}

exports.deleteOne = (req, res) => {
	Object.assign(req.body, req.params);

	Recipe.deleteOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while deleting a recipe"
			});
		}

		else {
			return res.status(200).json({ affectedRows: data });
		}
	});
}