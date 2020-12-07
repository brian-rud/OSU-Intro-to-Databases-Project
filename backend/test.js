const express = require('express');
const router = express.Router()
const request = require('request');

const recipe_api_url = "http://localhost:8998/recipes";
const cuisine_api_url = "http://localhost:8998/cuisines";
const diet_api_url = "http://localhost:8998/diets";
const recipe_ingredient_api_url = "http://localhost:8998/recipeIngredients";
const ingredient_api_url = "http://localhost:8998/ingredients";

var options = {
        method: "PUT",
        body: {quantity:5, unit: 'lb'},
        json: true,
        url: recipe_ingredient_api_url  +"/1/2"
    };
    
    //console.log(options);
    let context = {};

    // One way ticket to callback hell
    // Get Recipe attributes
    request(options, (recipeErr, recipeRes, recipeBody) => {
        console.log("recipeIngredients: ", recipeBody);
    });