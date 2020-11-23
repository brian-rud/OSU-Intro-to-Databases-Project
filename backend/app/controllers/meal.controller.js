const Meal = require("../models/meal.model");

exports.findAll = (req, res) => {
	Meal.fetchAll((err, data) => {

		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while retrieving meals"
			});
		}

		else {
			return res.status(200).json({ data });
		}
	});
}

exports.findOne = (req, res) => {
	Object.assign(req.body, req.params);

	Meal.fetchOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while retrieving a meal"
			});
		}

		else {
			return res.status(200).json({ data });
		}
	})
}

exports.addOne = (req, res) => {
	Meal.addOne(req.body,(err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while adding a meal"
			});
		}

		else {
			return res.status(200).json({ affected_rows: data });
		}
	})
}

exports.updateOne = (req, res) => {
	Meal.updateOne(req.body, req.params, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while updating a meal"
			});
		}

		else {
			return res.status(200).json({ affectedRows: data });
		}
	});
}

exports.deleteOne = (req, res) => {
	Object.assign(req.body, req.params);

	Meal.deleteOne(req.body, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err.message || "An error occurred while deleting a meal"
			});
		}

		else {
			return res.status(200).json({ affectedRows: data });
		}
	});
}