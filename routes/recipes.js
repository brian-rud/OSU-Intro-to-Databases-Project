const express = require('express');
const router = express.Router()
const request = require('request');

const recipe_api_url = "http://localhost:8998/recipes";
const cuisine_api_url = "http://localhost:8998/cuisines";
const diet_api_url = "http://localhost:8998/diets";
const ingredient_api_url = "http://localhost:8998/ingredients";
const recipe_ingredients_api_url = "http://localhost:8998/recipeIngredients";

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

router.get('/:recipeId', (req,res) => {
    
    var recipeId = req.params.recipeId;

    var options = {
        method: "GET",
        body: {},
        json: true,
        url: recipe_api_url + "/" + recipeId
    };
    
    //console.log(options);
    let context = {};

    // One way ticket to callback hell
    // Get Recipe attributes
    request(options, (recipeErr, recipeRes, recipeBody) => {
        console.log("recipeBody: ", recipeBody);
        context.recipeId = recipeBody.data[0].recipe_id;
        context.name = recipeBody.data[0].name;
        context.recipeUrl = recipeBody.data[0].recipe_url;
        context.description = recipeBody.data[0].description;
        context.servingAmount = recipeBody.data[0].serving_amount;

        // Get RecipeIngredients information
        options.url = recipe_ingredients_api_url + "/" + recipeId;
        
        request(options, (recipeIngredientsErr, recipeIngredientsRes, recipeIngredientsBody) => {
            context.recipeIngredients = recipeIngredientsBody;
            //console.log("recipeIngredientsBody:" , recipeIngredientsBody)

            context.recipeIngredientsArray = [];

            // Get Ingredient Names
            recipeIngredientsBody.forEach((recipeIngredient) => {

                options.url = ingredient_api_url + "/" + recipeIngredient.ingredientId;
              
                request(options, (ingredientsErr, ingredientsBodyRes, ingredientsBody) => {
                  
                    recipeIngredient.ingredientName = ingredientsBody[0].name;
                    context.recipeIngredientsArray.push(recipeIngredient);
                    
                });
                
            })
           
            for(let i=0; i<6; i++){
                setTimeout(() => {
                    if(i == 5)
                        res.render("individualRecipe", context)
                }, 1000)
            }

            
        });
        
        
    });

   
    
        
});

module.exports = router