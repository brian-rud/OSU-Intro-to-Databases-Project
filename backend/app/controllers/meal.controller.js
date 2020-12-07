const Meal = require('../models/meal.model');

exports.findAll = (req, res) => {
	Meal.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving Meals"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}

	})
}

// Create and Save a new Meal
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    // Instantiate a Meal from incoming HTTP Request
    let meal = Meal.fromReqBody(req.body);

    Meal.create(meal, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Meal."
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
};

exports.updateOne = (req, res) => {
    if (!req.body || !req.params) {
        return res.status(400).json({ message: "Content can not be empty!" });
    }

    // Include mealId from route in body
    Object.assign(req.body, req.params);

    Meal.updateOne(req.body, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Some error occurred while creating the Meal." });
        }

        return res.status(200).json({ data });
    });
};

exports.deleteOne = (req, res) => {
    if (!req.params) {
        return res.status(400).json({ message: "Content can not be empty!" });
    }

    // Include mealId from route in body
    Meal.deleteOne(req.params.mealId, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Some error occurred while creating the Meal. "});
        }

        return res.status(200).json(data);
    });
};