const express = require('express')
const router = express.Router()
const request = require('request');

router.get('/', (req,res) => {
    
    var diet_api_url = "http://localhost:8998/diets";
    var options = {
    	method: "GET",
    	body: {},
    	json: true,
    	url: diet_api_url
    };

    let dietArray = [];

    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error requesting diets from backend API");
    		return;
    	}

    	dietArray = body;
    	res.render('diets', {dietArray});
    	
    })
   
})

router.post('/', (req,res) => {
	
	var diet_api_url = "http://localhost:8998/diets";
    var options = {
    	method: "POST",
    	body: {id: 0, name:req.body.add_item},
    	json: true,
    	url: diet_api_url
    };
    
    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error adding diet");
    		return;
    	}

    	options.method = "GET";
    	options.body = {};
    	let dietsArray = [];

    	request(options, (geterr, getres, getbody) => {
    		if(err){
    			console.log("There was an error displaying diets");
    			return;
    		}

    		dietsArray = getbody;
    		res.redirect('/diets');

    	})
    })
})

module.exports = router;