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

RecipeCuisine.fetchOne = (params, result) => {

	sql.query(
		"SELECT * FROM recipe_cuisines WHERE recipe_id = ?",
		[parseInt(params.recipeId)],
		(err, res) => {
			
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			const recipeCuisineArray = [];
			res.forEach(recipeCuisineDbDto => recipeCuisineArray.push(RecipeCuisine.fromRecipeCuisineDbDto(recipeCuisineDbDto)));
			console.log("RecipeCuisines: ", recipeCuisineArray);
			result(null, recipeCuisineArray);
		})
}

RecipeCuisine.addOne = (body, result) => {
	sql.query(
		'INSERT INTO recipe_cuisines (recipe_id, cuisine_id) VALUES (?,?)', 
		[body.recipeId, body.cuisineId], 
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

// RecipeCuisine.updateOne = (body, result) => {
// 	sql.query(
// 		'UPDATE recipe_cuisines SET quantity=?, unit=? WHERE recipe_id=? AND cuisine_id=?', 
// 		[parseInt(body.quantity),body.unit, parseInt(body.recipeId), parseInt(body.cuisineId)], 
// 		(err, res) => {
// 		if (err) {
// 			console.log('Error: ', err)
// 			result(err, null);
// 			return
// 		}

// 		console.log('rows affected: ', res.affectedRows);
// 		result(null, res.affectedRows);
// 	});
// }

RecipeCuisine.deleteOne = (body, result) => {
	sql.query(
		'DELETE FROM recipe_cuisines WHERE recipe_id = ? AND cuisine_id = ?', 
		[parseInt(body.recipeId), parseInt(body.cuisineId)], 
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


module.exports = RecipeCuisine;