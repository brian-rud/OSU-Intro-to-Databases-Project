const express = require('express')
const request = require('request');
const router = express.Router();
const cuisine_api_url = process.env.API_URL + "/cuisines";

router.get('/', (req,res) => {
    const options = {
    	method: "GET",
    	body: {},
    	json: true,
    	url: cuisine_api_url
    };

    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error requesting cuisines from backend API");
    		return;
    	}

    	const cuisineArray = body;
    	res.render('cuisines', {cuisineArray});
    	
    });
});

router.post('/', (req,res) => {
    const options = {
    	method: "POST",
    	body: {id: 0, name:req.body.add_item},
    	json: true,
    	url: cuisine_api_url
    };
    
    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error adding cuisine");
    		return;
    	}

		res.redirect('/cuisines');
    });
});

router.put('/', (req, res) => {
	const options = {
		method: "PUT",
		body: {},
		json: true,
		url: cuisine_api_url
	};

	request(options, (err, res1, body) => {
		if (err) {
			console.log("There was an error updating a cuisine");
			return;
		}

		res.redirect('/cuisines');
	});
});

module.exports = router;