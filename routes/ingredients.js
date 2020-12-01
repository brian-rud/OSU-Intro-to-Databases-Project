const express = require('express')
router = express.Router()
const request = require("request")
const ingredient_api_url = process.env.API_URL + "/ingredients";

router.get('/', (req, res) => {
	var options = {
    	method: "GET",
    	body: {},
    	json: true,
    	url: ingredient_api_url
    };

    let context = {};

    request(options, (ingredientErr, ingredientRes, ingredientBody) => {
    	if (ingredientErr){
    		console.log("There was an error requesting ingredients from backend API");
    		return;
    	}

    	context.ingredientsArray = ingredientBody;
    	console.log(context);
    	res.render("ingredients", context)

    })
})

router.post('/', (req,res) => {
    var options = {
    	method: "POST",
    	body: {id: 0, name:req.body.add_item},
    	json: true,
    	url: ingredient_api_url
    };
    
    request(options, (err, res1, body) => {
    	if (err){
    		console.log("There was an error adding ingredient");
    		return;
    	}

    	options.method = "GET";
    	options.body = {};
    	let ingredientsArray = [];

    	request(options, (geterr, getres, getbody) => {
    		if(err){
    			console.log("There was an error displaying ingredients");
    			return;
    		}

    		ingredientsArray = getbody;
    		res.redirect('/ingredients');

    	})
    })
})

module.exports = router