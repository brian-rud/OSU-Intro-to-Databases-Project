const sql = require("./db.js");

class Recipe {
	constructor(recipeId, recipeUrl, name, description, servingAmount){
		this.recipeId = recipeId;
		this.recipeUrl = recipeUrl;
		this.name = name;
		this.description = description;
		this.servingAmount = servingAmount

	}

	static fromReqBody(reqBody){
		return new Recipe(
			reqBody.recipeId,
			reqBody.recipeUrl,
			reqBody.name,
			reqBody.description,
			reqBody.servingAmount

			);
	}

	static fromRecipeDbDto(recipeDbDto){
		return new Recipe(
			recipeDbDto.recipe_id,
			recipeDbDto.recipe_url,
			recipeDbDto.name,
			recipeDbDto.description,
			recipeDbDto.serving_amount

			);
	}
}

class RecipeDbDto {
	constructor(recipe_id, recipe_url, name, description, serving_amount){
		this.recipe_id = recipe_id;
		this.recipe_url = recipe_url;
		this.name = name;
		this.description = description;
		this.serving_amount
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
		result(null, res);
	});
}

Recipe.fetchOne = (body, result) => {
	sql.query("SELECT * FROM recipes WHERE recipes.recipe_id = ?;",[parseInt(body.recipeId)],(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			const recipe = Recipe.fromRecipeDbDto(res[0]);
			result(null, res);
	});
}

Recipe.addOne = (body, result) => {
	sql.query("INSERT INTO recipes (recipe_url, name, description, serving_amount) " +"VALUES(?, ?, ?, ?);",[body.recipeUrl, body.name, body.description, parseInt(body.servingAmount)], (err, res) => {
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
	sql.query('UPDATE recipes SET ? WHERE ?;',[body, params],(err, res) => {
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