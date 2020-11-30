const Diet = require('../models/diet.model');

exports.findAll = (req, res) => {
	Diet.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving Diets"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}

	})
}

// Create and Save a new Diet
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Instantiate a Diet from incoming HTTP Request
    let diet = Diet.fromReqBody(req.body);

    Diet.create(diet, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Diet."
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
};

// Update a previously entered diet
exports.updateOne = (req, res) => {
    if (!req.body || !req.params) {
        return res.status(400).json({ message: "Content cannot be empty!" });
    }

    // Include dietId from route in body
    Object.assign(req.body, req.params);

    Diet.updateOne(req.body, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Some error occurred while creating the Cuisine." });
        }

        return res.status(200).json({ data });
    });
};

exports.deleteOne = (req, res) => {
    if (!req.params) {
        return res.status(400).json({ message: "Content cannot be empty!" });
    }

    Diet.deleteOne(req.params.dietId, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Some error occurred while creating the Cuisine." });
        }

        return res.status(200).json(data);
    });
};