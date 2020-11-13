const sql = require('./db');

class RecipeIngredient{
	constructor(recipeId, ingredientId, quantity, unit){
		this.recipeId = recipeId;
		this.ingredientId = ingredientId;
		this.quantity = quantity;
		this.unit = unit;
	}

	static fromReqBody(reqBody){
		return new RecipeIngredient(
			reqBody.recipeId,
			reqBody.ingredientId,
			reqBody.quantity,
			reqBody.unit
			);
	}

	static fromRecipeIngredientDbDto(recipeIngredientDbDto){
		return new RecipeIngredient(
			recipeIngredientDbDto.recipe_id,
			recipeIngredientDbDto.ingredient_id,
			recipeIngredientDbDto.quantity,
			recipeIngredientDbDto.unit
			)
	}
}

class RecipeIngredientDbDto{
	constructor(recipe_id, ingredient_id, quantity, unit){
		this.recipe_id = recipe_id;
		this.ingredient_id = ingredient_id;
		this.quantity = quantity;
		this.unit = unit;
	}
}

RecipeIngredient.fetchAll = result => {
	sql.query("SELECT * FROM recipe_ingredients", (err, res) => { 
		if(err){
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		recipeIngredientArray = [];
		res.forEach(recipeIngredientDbDto => recipeIngredientArray.push(RecipeIngredient.fromRecipeIngredientDbDto(recipeIngredientDbDto)));
		console.log(recipeIngredientArray);
		result(null, recipeIngredientArray);

	});

}

module.exports = RecipeIngredient;