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
        res.status(400).send({
            message: "Content can not be empty!"
        });
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