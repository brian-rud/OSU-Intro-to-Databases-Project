const sql = require("./db.js");

class Recipe {
	constructor(recipeId, recipeUrl, name, description, meal, userId, servingAmount){
		this.recipeId = recipeId;
		this.recipeUrl = recipeUrl;
		this.name = name;
		this.description = description;
		this.meal = meal;
		this.userId = userId;
		this.servingAmount = servingAmount
	}

	static fromReqBody(reqBody){
		return new Recipe(
			reqBody.recipeId,
			reqBody.recipeUrl,
			reqBody.name,
			reqBody.description,
			reqBody.meal,
			reqBody.userId,
			reqBody.servingAmount
			);
	}

	static fromRecipeDbDto(recipeDbDto){
		return new Recipe(
			recipeDbDto.recipe_id,
			recipeDbDto.recipe_url,
			recipeDbDto.name,
			recipeDbDto.description,
			recipeDbDto.meal,
			recipeDbDto.user_id,
			recipeDbDto.serving_amount
			);
	}
}

class RecipeDbDto {
	constructor(recipe_id, recipe_url, name, description, meal, user_id, serving_amount){
		this.recipe_id = recipe_id;
		this.recipe_url = recipe_url;
		this.name = name;
		this.description = description;
		this.meal = meal;
		this.user_id = user_id;
		this.serving_amount = serving_amount;
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
		"INSERT INTO recipes (user_id, recipe_url, name, description, meal, serving_amount) " +
		"VALUES(?, ?, ?, ?, ?, ?);",
		[
			parseInt(body.userId),
			body.recipeUrl,
			body.name,
			body.description,
			body.meal,
			parseInt(body.servingAmount)
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