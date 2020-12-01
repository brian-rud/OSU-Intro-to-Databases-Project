const express = require('express')
const request = require('request');
const router = express.Router();
const meal_api_url = process.env.API_URL + "/meals";

router.get('/', (req,res) => {
    const options = {
    	method: "GET",
    	body: {},
    	json: true,
    	url: meal_api_url
    };

    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error requesting meals from backend API");
    		return;
    	}

    	const mealArray = body;
    	res.render('meals', {mealArray});
    	
    });
});

router.post('/', (req,res) => {
    const options = {
    	method: "POST",
    	body: {id: 0, name:req.body.add_item},
    	json: true,
    	url: meal_api_url
    };
    
    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error adding meal");
    		return;
    	}

		res.redirect('/meals');
    });
});

router.put('/', (req, res) => {
	const options = {
		method: "PUT",
		body: {},
		json: true,
		url: meal_api_url
	};

	request(options, (err, res1, body) => {
		if (err) {
			console.log("There was an error updating a meal");
			return;
		}

		res.redirect('/meals');
	});
});

module.exports = router;