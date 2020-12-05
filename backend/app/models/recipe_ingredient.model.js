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

RecipeIngredient.fetchOne = (params, result) => {

	sql.query(
		"SELECT * FROM recipe_ingredients WHERE recipe_id = ?",
		[parseInt(params.recipeId)],
		(err, res) => {
			
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			const recipeIngredientArray = [];
			res.forEach(recipeIngredientDbDto => recipeIngredientArray.push(RecipeIngredient.fromRecipeIngredientDbDto(recipeIngredientDbDto)));
			console.log("RecipeIngredients: ", recipeIngredientArray);
			result(null, recipeIngredientArray);
		})
}

RecipeIngredient.addOne = (body, result) => {
	sql.query(
		'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?,?)', 
		[body.recipeId, body.ingredientId], 
		(err, res) => {
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}


		console.log('rows added: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}

RecipeIngredient.updateOne = (body, result) => {
	sql.query(
		'UPDATE recipe_ingredients SET quantity=?, unit=? WHERE recipe_id=? AND ingredient_id=?', 
		[parseInt(body.quantity),body.unit, parseInt(body.recipeId), parseInt(body.ingredientId)], 
		(err, res) => {
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}

		console.log('rows affected: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}

RecipeIngredient.deleteOne = (body, result) => {
	sql.query(
		'DELETE FROM recipe_ingredients WHERE recipe_id = ? AND ingredient_id = ?', 
		[parseInt(body.recipeId), parseInt(body.ingredientId)], 
		(err, res) => {
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}

		console.log('rows affected: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}



module.exports = RecipeIngredient;