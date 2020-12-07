const sql = require('./db');

class RecipeIngredient{
	constructor(recipeId, ingredientId){
		this.recipeId = recipeId;
		this.ingredientId = ingredientId;
	}

	static fromReqBody(reqBody){
		return new RecipeIngredient(
			reqBody.recipeId,
			reqBody.ingredientId
			);
	}

	static fromRecipeIngredientDbDto(recipeIngredientDbDto){
		return new RecipeIngredient(
			recipeIngredientDbDto.recipe_id,
			recipeIngredientDbDto.ingredient_id
			)
	}
}

class RecipeIngredientDbDto{
	constructor(recipe_id, ingredient_id){
		this.recipe_id = recipe_id;
		this.ingredient_id = ingredient_id;
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
		result(null, recipeIngredientArray);

	});

}



RecipeIngredient.fetchOne = (params, result) => {

	sql.query(
		"SELECT * FROM recipe_ingredients WHERE recipe_id = ?", [parseInt(params.recipeId)], (recipeIngredientErr, recipeIngredientRes) => {
			
			if (recipeIngredientErr) {
				console.log("Error: ", recipeIngredientErr);
				result(recipeIngredientErr, null);
				return;
			}

			var recipeIngredientArray = [];
			var count = 0;
		
			if(recipeIngredientRes.length == 0){
				result(null, recipeIngredientArray);
				return
			}

			recipeIngredientRes.forEach(recipeIngredientDbDto => {
				
				recipeIngredient = RecipeIngredient.fromRecipeIngredientDbDto(recipeIngredientDbDto)

				sql.query("SELECT * FROM ingredients WHERE ingredient_id = ?", [parseInt(recipeIngredient.ingredientId)], (ingredientErr, ingredientRes) => {
					count = count + 1;
					if (ingredientErr){
						console.log("Error: ", ingredientErr)
						result(ingredientErr)
						return
					}
				
					recipeIngredient.ingredientName = ingredientRes[0].name;
					recipeIngredientArray.push({recipeId: recipeIngredient.recipeId, ingredientId: ingredientRes[0].ingredient_id, ingredientName: ingredientRes[0].name});

					if (count == recipeIngredientRes.length){
						result(null, recipeIngredientArray);
					}
				})
			
			})
		
		})
}

RecipeIngredient.addOne = (body, result) => {

	if (body.recipeId.length !== undefined)
		body.recipeId = body.recipeId[0]

	sql.query('INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?,?)', [body.recipeId, body.ingredientId], (err, res) => {
		
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
	sql.query('UPDATE recipe_ingredients SET quantity=?, unit=? WHERE recipe_id=? AND ingredient_id=?', [parseInt(body.quantity),body.unit, parseInt(body.recipeId), parseInt(body.ingredientId)], (err, res) => {
		
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
		'DELETE FROM recipe_ingredients WHERE recipe_id = ? AND ingredient_id = ?', [parseInt(body.recipeId), parseInt(body.ingredientId)], (err, res) => {
		
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