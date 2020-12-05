const sql = require('./db');

class RecipeDiet{
	constructor(recipeId, dietId){
		this.recipeId = recipeId;
		this.dietId = dietId;
	}

	static fromReqBody(reqBody){
		return new RecipeDiet(
			reqBody.recipeId,
			reqBody.dietId,
			);
	}

	static fromRecipeDietDbDto(recipeDietDbDto){
		return new RecipeDiet(
			recipeDietDbDto.recipe_id,
			recipeDietDbDto.diet_id,
			)
	}
}

class RecipeDietDbDto{
	constructor(recipe_id, diet_id, quantity, unit){
		this.recipe_id = recipe_id;
		this.diet_id = diet_id;
	}
}

RecipeDiet.fetchAll = result => {
	sql.query("SELECT * FROM recipe_diets", (err, res) => { 
		if(err){
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		recipeDietArray = [];
		res.forEach(recipeDietDbDto => recipeDietArray.push(RecipeDiet.fromRecipeDietDbDto(recipeDietDbDto)));
		console.log(recipeDietArray);
		result(null, recipeDietArray);

	});
}

RecipeDiet.fetchOne = (params, result) => {

	sql.query(
		"SELECT * FROM recipe_diets WHERE recipe_id = ?",
		[parseInt(params.recipeId)],
		(err, res) => {
			
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			const recipeDietArray = [];
			res.forEach(recipeDietDbDto => recipeDietArray.push(RecipeDiet.fromRecipeDietDbDto(recipeDietDbDto)));
			console.log("RecipeDiets: ", recipeDietArray);
			result(null, recipeDietArray);
		})
}

RecipeDiet.addOne = (body, result) => {
	sql.query(
		'INSERT INTO recipe_diets (recipe_id, diet_id) VALUES (?,?)', 
		[body.recipeId, body.dietId], 
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

// RecipeDiet.updateOne = (body, result) => {
// 	sql.query(
// 		'UPDATE recipe_diets SET quantity=?, unit=? WHERE recipe_id=? AND diet_id=?', 
// 		[parseInt(body.quantity),body.unit, parseInt(body.recipeId), parseInt(body.dietId)], 
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

RecipeDiet.deleteOne = (body, result) => {
	sql.query(
		'DELETE FROM recipe_diets WHERE recipe_id = ? AND diet_id = ?', 
		[parseInt(body.recipeId), parseInt(body.dietId)], 
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



module.exports = RecipeDiet;