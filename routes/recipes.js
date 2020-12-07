const express = require('express');
const router = express.Router()
const request = require('request');
const axios = require('axios');

const recipe_api_url = "http://localhost:8998/recipes";
const cuisine_api_url = "http://localhost:8998/cuisines";
const diet_api_url = "http://localhost:8998/diets";
const meal_api_url = "http://localhost:8998/meals"
const ingredient_api_url = "http://localhost:8998/ingredients";

const recipe_ingredients_api_url = "http://localhost:8998/recipeIngredients";
const recipe_diets_api_url = "http://localhost:8998/recipeDiets";
const recipe_cuisines_api_url = "http://localhost:8998/recipeCuisines";
const recipe_meals_api_url = "http://localhost:8998/recipeMeals"


    
router.get('/', (req,res) => {
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
    	// console.log(context);
    	
    	// Get cuisines from database
    	options.url = cuisine_api_url;

    	request(options, (cuisineErr, cuisineRes, cuisineBody) => {
    		if(cuisineErr){
    			console.log("There was an error requesting cuisines from backend API");
    			return;
    		}

    		context.cuisineArray = cuisineBody;
    		// console.log(context);

    		// Get diets from database
    		options.url = diet_api_url;

    		request(options, (dietErr, dietRes, dietBody) => {
    			if(dietErr) {
    				console.log("There was an error requesting diets from backend API");
    				return;
    			}

    			context.dietArray = dietBody
    			// console.log(context)
   
    		})

    		// Get ingredients from database
    		options.url = ingredient_api_url;

    		request(options, (ingredientErr, ingredientRes, ingredientBody) => {
    			if(ingredientErr) {
    				console.log("There was an error requesting ingredients from backend API");
    				return;
    			}

    			context.ingredientArray = ingredientBody
    			// console.log(context)
    			res.render("recipes", context)
    		})

    		
    	})

    	
    })
   
})

router.get('/:recipeId', (req,res) => {
    
    var recipeId = req.params.recipeId;
    var context = {};


    
axios.all([axios.get(recipe_api_url + "/" + recipeId),
           axios.get(cuisine_api_url),
           axios.get(ingredient_api_url),
           axios.get(diet_api_url),
           axios.get(meal_api_url),
           axios.get(recipe_ingredients_api_url + "/" + recipeId),
           axios.get(recipe_diets_api_url + "/" + recipeId),
           axios.get(recipe_cuisines_api_url + "/" + recipeId),
           axios.get(recipe_meals_api_url + "/" + recipeId)])
     .then(axios.spread((recipeResponse, cuisineResponse, ingredientResponse, dietResponse, mealResponse, recipeIngredientsResponse, recipeDietsResponse, recipeCuisinesResponse, recipeMealsResponse) => {  

        // Load reicpe data into context
        context.recipeId = recipeResponse.data.data[0].recipe_id;
        context.name = recipeResponse.data.data[0].name;
        context.recipeUrl = recipeResponse.data.data[0].recipe_url;
        context.description = recipeResponse.data.data[0].description;
        context.servingAmount = recipeResponse.data.data[0].serving_amount;

        // Load entity data into context
        context.cuisinesArray = cuisineResponse.data;
        context.ingredientsArray = ingredientResponse.data;
        context.dietsArray = dietResponse.data;
        context.mealsArray = mealResponse.data;
       
        // Load relationship data into context
        context.recipeIngredientsArray = recipeIngredientsResponse.data;
        context.recipeDietsArray = recipeDietsResponse.data;
        context.recipeCuisinesArray = recipeCuisinesResponse.data;
        context.recipeMealsArray = recipeMealsResponse.data;

        console.log("RECIPECUISINES", context.recipeCuisinesArray)

       // Render individual Recipe with context
       res.render("individualRecipe", context)

    })).catch(error => console.log(error));
})


module.exports = router
