const sql = require("./db.js");

class Recipe {
	constructor(recipeId, recipeUrl, name, description, cuisineId, dietId, mealId){
		this.recipeId = recipeId;
		this.recipeUrl = recipeUrl;
		this.name = name;
		this.description = description;
		this.cuisineId = cuisineId;
		this.dietId = dietId;
		this.mealId = mealId;
	}

	static fromReqBody(reqBody){
		return new Recipe(
			reqBody.recipeId,
			reqBody.recipeUrl,
			reqBody.name,
			reqBody.description,
			reqBody.cuisineId,
			reqBody.dietId,
			reqBody.mealId,
			);
	}

	static fromRecipeDbDto(recipeDbDto){
		return new Recipe(
			recipeDbDto.recipe_id,
			recipeDbDto.recipe_url,
			recipeDbDto.name,
			recipeDbDto.description,
			recipeDbDto.cuisine_id,
			recipeDbDto.diet_id,
			recipeDbDto.meal_id,
			);
	}
}

class RecipeDbDto {
	constructor(recipe_id, recipe_url, name, description, cuisineId, dietId, mealId){
		this.recipe_id = recipe_id;
		this.recipe_url = recipe_url;
		this.name = name;
		this.description = description;
		this.cuisine_id = cuisineId;
		this.diet_id = dietId;
		this.meal_id = mealId;
	}
}

Recipe.fetchAll = result => {
	sql.query("SELECT * FROM recipes", (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		const recipeArray = [];
		res.forEach(recipeDbDto => recipeArray.push(Recipe.fromRecipeDbDto(recipeDbDto)));
		console.log("recipes: ", recipeArray);
		result(null, res);
	});
}

Recipe.fetchOne = (body, result) => {
	sql.query(
		"SELECT * FROM recipes WHERE recipes.recipe_id = ?;",
		[parseInt(body.recipeId)],
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			const recipe = Recipe.fromRecipeDbDto(res[0]);
			console.log("recipe: ", recipe);
			result(null, res);
	});
}

Recipe.addOne = (body, result) => {
	sql.query(
		"INSERT INTO recipes (recipe_url, name, description, cuisine_id, diet_id, meal_id) " +
		"VALUES(?, ?, ?, ?, ?);",
		[
			body.recipeUrl,
			body.name,
			body.description,
			body.cuisine_id,
			body.diet_id,
			body.meal_id,
		],
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			console.log('rows affected: ', res.affectedRows);
			result(null, res.affectedRows);
	});
}

Recipe.updateOne = (body, params, result) => {
	sql.query('UPDATE recipes SET ? WHERE ?;',
		[body, params],
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			console.log("rows affected", res.affectedRows);
			result(null, res.affectedRows);
	});
}

Recipe.deleteOne = (body, result) => {
	sql.query("DELETE FROM recipes WHERE recipe_id = ?;", [parseInt(body.recipeId)], (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		console.log("rows affected", res.affectedRows);
		result(null, res.affectedRows);
	});
}

module.exports = Recipe