const express = require('express')
const request = require('request');
router = express.Router()

router.get('/', (req,res) => {
    
    var cuisine_api_url = "http://localhost:8998/cuisines";
    var options = {
    	method: "GET",
    	body: {},
    	json: true,
    	url: cuisine_api_url
    };

    let cuisineArray = [];

    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error requesting cuisines from backend API");
    		return;
    	}

    	cuisineArray = body;
    	res.render('cuisines', {cuisineArray});
    	
    })
   
})

router.post('/', (req,res) => {
	
	var cuisine_api_url = "http://localhost:8998/cuisines";
    var options = {
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

    	options.method = "GET";
    	options.body = {};
    	let cuisinesArray = [];

    	request(options, (geterr, getres, getbody) => {
    		if(err){
    			console.log("There was an error displaying cuisines");
    			return;
    		}

    		cuisinesArray = getbody;
    		res.redirect('/cuisines');

    	})
    })
})

module.exports = router