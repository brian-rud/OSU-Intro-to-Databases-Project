const sql = require('./db');

class RecipeCuisine{
	constructor(recipeId, cuisineId){
		this.recipeId = recipeId;
		this.cuisineId = cuisineId;
	}

	static fromReqBody(reqBody){
		return new RecipeCuisine(
			reqBody.recipeId,
			reqBody.cuisineId,
			);
	}

	static fromRecipeCuisineDbDto(recipeCuisineDbDto){
		return new RecipeCuisine(
			recipeCuisineDbDto.recipe_id,
			recipeCuisineDbDto.cuisine_id,
			)
	}
}

class RecipeCuisineDbDto{
	constructor(recipe_id, cuisine_id, quantity, unit){
		this.recipe_id = recipe_id;
		this.cuisine_id = cuisine_id;
	}
}

RecipeCuisine.fetchAll = result => {
	sql.query("SELECT * FROM recipe_cuisines", (err, res) => { 
		if(err){
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		recipeCuisineArray = [];
		res.forEach(recipeCuisineDbDto => recipeCuisineArray.push(RecipeCuisine.fromRecipeCuisineDbDto(recipeCuisineDbDto)));
		console.log(recipeCuisineArray);
		result(null, recipeCuisineArray);

	});

}

module.exports = RecipeCuisine;