const express = require('express')
const request = require('request');
const router = express.Router();
const recipe_api_url = "http://localhost:8998/recipes";
// const recipe_meal_api_url = "http://localhost:8998/meals";
// const recipe_cuisine_api_url = "http://localhost:8998/recipeCuisines";
// const recipe_diet_api_url = "http://localhost:8998/recipeDiets";
// const recipe_ingredients_api_url = "http://localhost:8998/recipeIngredients";

router.get('/:recipeId', (req,res) => {
    
    var recipeId = parseInt(req.body.recipeId)
    var options = {
    	method: "GET",
    	body: {},
    	json: true,
    	url: recipe_api_url + "/" + recipeId
    };
    console.log(options);
    let context = {};

    // One way ticket to callback hell
    // request(options, (recipeErr, recipeRes, recipeBody) => {
    // res.render('individualRecipe');
    	
});

module.exports = router;