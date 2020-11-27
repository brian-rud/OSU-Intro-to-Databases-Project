const Cuisine = require('../models/cuisine.model');

exports.findAll = (req, res) => {
	Cuisine.fetchAll((err, data) => {
		if(err)
			res.status(500).send({message: err.message || "There was an error retrieving Cuisines"});

		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}

	})
}

// Create and Save a new Cuisine
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    // Instantiate a Cuisine from incoming HTTP Request
    let cuisine = Cuisine.fromReqBody(req.body);

    Cuisine.create(cuisine, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cuisine."
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

    // Include cuisineId from route in body
    Object.assign(req.body, req.params);
    console.log(req.body);

    Cuisine.updateOne(req.body, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Some error occurred while creating the Cuisine." });
        }

        return res.status(200).json({ data });
    });
};

exports.deleteOne = (req, res) => {
    if (!req.params) {
        return res.status(400).json({ message: "Content can not be empty!" });
    }

    // Include cuisineId from route in body
    Cuisine.deleteOne(req.params.cuisineId, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Some error occurred while creating the Cuisine. "});
        }

        return res.status(200).json(data);
    });
};