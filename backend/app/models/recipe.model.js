const sql = require("./db.js");

class Recipe {
	constructor(recipeId, recipeUrl, name, description, meal, userId){
		this.recipeId = recipeId;
		this.recipeUrl = recipeUrl;
		this.name = name;
		this.description = description;
		this.meal = meal;
		this.userId = userId
	}

	static fromReqBody(reqBody){
		return new Recipe(
			reqBody.recipeId,
			reqBody.recipeUrl,
			reqBody.name,
			reqBody.description,
			reqBody.meal,
			reqBody.userId
			);
	}

	static fromRecipeDbDto(recipeDbDto){
		return new Recipe(
			recipeDbDto.recipe_id,
			recipeDbDto.recipe_url,
			recipeDbDto.name,
			recipeDbDto.description,
			recipeDbDto.meal,
			recipeDbDto.user_id
			);
	}
}

class RecipeDbDto {
	constructor(recipe_id, recipe_url, name, description, meal, user_id){
		this.recipe_id = recipe_id;
		this.recipe_url = recipe_url;
		this.name = name;
		this.description = description;
		this.meal = meal;
		this.user_id = user_id;
	}
}


Recipe.fetchAll = result => {
	sql.query("SELECT * FROM recipes", (err, res) => {
		if (err){
			console.log("Error: ", err);
			result(err, null);
			return;
			}

		recipeArray = [];
		res.forEach(recipeDbDto => recipeArray.push(Recipe.fromRecipeDbDto(recipeDbDto)));
		console.log("recipes: ",recipeArray);
		result(null, res);

	})	

}

module.exports = Recipe