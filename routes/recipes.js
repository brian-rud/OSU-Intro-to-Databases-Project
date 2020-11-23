const express = require('express');
const router = express.Router()
const request = require('request');

router.get('/', (req,res) => {
    
    var recipe_api_url = "http://localhost:8998/recipes";
    var cuisine_api_url = "http://localhost:8998/cuisines";
    var diet_api_url = "http://localhost:8998/diets";
    var ingredient_api_url = "http://localhost:8998/ingredients";

    var options = {
    	method: "GET",
    	body: {},
    	json: true,
    	url: recipe_api_url
    };

    let context = {};

    // One way ticket to callback hell
    request(options, (recipeErr, recipeRes, recipeBody) => {
    	if (recipeErr){
    		console.log("There was an error requesting recipes from backend API");
    		return;
    	}

    	context.recipeArray = recipeBody;
    	console.log(context);
    	
    	// Get cuisines from database
    	options.url = cuisine_api_url;

    	request(options, (cuisineErr, cuisineRes, cuisineBody) => {
    		if(cuisineErr){
    			console.log("There was an error requesting cuisines from backend API");
    			return;
    		}

    		context.cuisineArray = cuisineBody;
    		console.log(context);

    		// Get diets from database
    		options.url = diet_api_url;

    		request(options, (dietErr, dietRes, dietBody) => {
    			if(dietErr) {
    				console.log("There was an error requesting diets from backend API");
    				return;
    			}

    			context.dietArray = dietBody
    			console.log(context)
   
    		})

    		// Get ingredients from database
    		options.url = ingredient_api_url;

    		request(options, (ingredientErr, ingredientRes, ingredientBody) => {
    			if(ingredientErr) {
    				console.log("There was an error requesting ingredients from backend API");
    				return;
    			}

    			context.ingredientArray = ingredientBody
    			console.log(context)
    			res.render("recipes", context)
    		})

    		
    	})

    	
    })
   
})

module.exports = router