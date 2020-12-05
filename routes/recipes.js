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
           axios.get(recipe_ingredients_api_url + "/" + recipeId)])
     .then(axios.spread((recipeResponse, cuisineResponse, ingredientResponse, recipeIngredientsResponse) => {  


        context.recipeId = recipeResponse.data.data[0].recipe_id;
        context.name = recipeResponse.data.data[0].name;
        context.recipeUrl = recipeResponse.data.data[0].recipe_url;
        context.description = recipeResponse.data.data[0].description;
        context.servingAmount = recipeResponse.data.data[0].serving_amount;

    
        context.cuisinesArray = cuisineResponse.data;

        context.ingredientsArray = ingredientResponse.data;
       
        context.recipeIngredientsArray;

        

        // recipeIngredientsResponse.data.forEach(recipeIngredient => {

        //     axios.get(ingredient_api_url + "/" + recipeIngredient.ingredientId).then(async function(ingredientResponse){
        //         //console.log(ingredientResponse.data)
        //         //console.log(ingredientResponse.data[0].name)
                
        //         var ingredientName = await ingredientResponse.data[0].name;
                
        //     }).catch(error=>(console.log(error)))

        //     console.log(recipeIngredient)
        //     context.recipeIngredientsArray.push(recipeIngredient);
            
        // })

        // res.render("individualRecipe", context)
        





     }))
     .catch(error => console.log(error));

})
        

        // //Get Cuisines information
        // options.url = cuisine_api_url;

        // request(options, (cusinesErr, cusinesRes, cuisinesBody) => {

        //     console.log("cuisinesBody: ", cuisinesBody);
        //     context.cuisinesArray = cuisinesBody;

        //     // Get RecipeCuisine information
        //     options.url = recipe_cuisines_api_url;

        //     request(options, (recipeCuisinesErr, recipeCuisinesRes, recipeCuisinesBody) => {

        //         console.log("recipeCusinesBody: ", recipeCuisinesBody);
        //         context.recipeCuisines = recipeCuisinesBody;
        //         context.recipeCuisinesArray = [];

        //         recipeCuisinesLength = recipeCuisinesBody.length;
        //         console.log("recipeCuisinesLength: ", recipeCuisinesLength)

        //         recipeCuisinesBody.forEach((recipeCuisine) => {
        //             count = count + 1;
        //             options.url = cuisine_api_url + "/" + recipeCuisine.cuisineId;
                          
        //             request(options, (cuisnesErr, cuisinesBodyRes, cuisinesBody) => {
                        

        //                 recipeCuisine.cuisineName = cuisinesBody[0].name;
        //                 context.recipeCuisinesArray.push(recipeCuisine);
        //                 console.log(recipeCuisine);
                                
        //                 });
                            
        //             })         
                


        //         // Get Ingredients information
        //         options.url =  ingredient_api_url;

        //         request(options, (ingredientsErr, ingredientsRes, ingredientsBody) => {

        //             context.ingredientsArray = ingredientsBody;
        //             console.log("ingredientsArray: " , context.ingredientsArray);
                    
                    

        //             // Get RecipeIngredients information
        //             options.url = recipe_ingredients_api_url + "/" + recipeId;
                    
        //             request(options, (recipeIngredientsErr, recipeIngredientsRes, recipeIngredientsBody) => {
        //                 context.recipeIngredients = recipeIngredientsBody;
        //                 //console.log("recipeIngredientsBody:" , recipeIngredientsBody)

        //                 context.recipeIngredientsArray = [];
        //                 recipeIngredientsLength = recipeIngredientsBody.length;
        //                 console.log("recipeIngredientsLenght: ", recipeIngredientsLength)

        //                 // Get Ingredient Names
                        

        //                 recipeIngredientsBody.forEach((recipeIngredient) => {

        //                     options.url = ingredient_api_url + "/" + recipeIngredient.ingredientId;
                          
        //                     request(options, (ingredientsErr, ingredientsBodyRes, ingredientsBody) => {
        //                         count = count + 1;;
        //                         recipeIngredient.ingredientName = ingredientsBody[0].name;
        //                         context.recipeIngredientsArray.push(recipeIngredient);
                                
        //                     });
                            
        //                 })
                       
   

                        
        //             });
        //         });
        //     });
        // });
    
        //              while (count != recipeIngredientsLength + recipeCuisinesLength){
        //                 console.log(count)
        //              }
        //              res.render("individualRecipe", context)
        //              // for(let i=0; i<1; i++){
        //              //        setTimeout(() => {
        //              //            if(i == 5)
        //              //                console.log("i is 5")
        //              //                res.render("individualRecipe", context)
        //              //        }, 6000)
        //              //    }

                
    
        
// });

module.exports = router