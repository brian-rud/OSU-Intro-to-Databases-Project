const sql = require('./db');

class RecipeMeal{
	constructor(recipeId, mealId){
		this.recipeId = recipeId;
		this.mealId = mealId;
	}

	static fromReqBody(reqBody){
		return new RecipeMeal(
			reqBody.recipeId,
			reqBody.mealId,
			);
	}

	static fromRecipeMealDbDto(recipeMealDbDto){
		return new RecipeMeal(
			recipeMealDbDto.recipe_id,
			recipeMealDbDto.meal_id,
			)
	}
}

class RecipeMealDbDto{
	constructor(recipe_id, meal_id){
		this.recipe_id = recipe_id;
		this.meal_id = meal_id;
	}
}

RecipeMeal.fetchAll = result => {
	sql.query("SELECT * FROM recipe_meals", (err, res) => { 
		if(err){
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		recipeMealArray = [];
		res.forEach(recipeMealDbDto => recipeMealArray.push(RecipeMeal.fromRecipeMealDbDto(recipeMealDbDto)));
		console.log(recipeMealArray);
		result(null, recipeMealArray);

	});

}

module.exports = RecipeMeal;