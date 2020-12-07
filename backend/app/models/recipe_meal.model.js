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
	constructor(recipe_id, meal_id, quantity, unit){
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
		result(null, recipeMealArray);

	});
}

RecipeMeal.fetchOne = (params, result) => {

	sql.query(
		"SELECT * FROM recipe_meals WHERE recipe_id = ?",[parseInt(params.recipeId)], (recipeMealErr, recipeMealRes) => {
			
			if (recipeMealErr) {
				console.log("Error: ", recipeMealErr);
				result(recipeMealErr, null);
				return;
			}

			var recipeMealArray = [];
			var count = 0;

			if(recipeMealRes.length == 0){
				result(null, recipeMealArray);
				return
			}

			recipeMealRes.forEach(recipeMealDbDto => {
				recipeMeal = RecipeMeal.fromRecipeMealDbDto(recipeMealDbDto)
				
				sql.query("SELECT * FROM meals WHERE meal_id = ?", [parseInt(recipeMeal.mealId)], (mealErr, mealRes) => {
					count = count + 1;
					if (mealErr){
						console.log("Error: ", mealErr)
						result(mealErr)
						return
					}
					
					recipeMeal.mealName = mealRes[0].name;
				
					recipeMealArray.push({recipeId: recipeMeal.recipeId, mealId: mealRes[0].meal_id, mealName: mealRes[0].name});

					if (count == recipeMealRes.length){
						result(null, recipeMealArray);
					}
				})
			
			})


		
		})
}
RecipeMeal.addOne = (body, result) => {
	sql.query('INSERT INTO recipe_meals (recipe_id, meal_id) VALUES (?,?)', [body.recipeId, body.mealId], (err, res) => {
		
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}


		console.log('rows added: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}

// RecipeMeal.updateOne = (body, result) => {
// 	sql.query(
// 		'UPDATE recipe_meals SET quantity=?, unit=? WHERE recipe_id=? AND meal_id=?', 
// 		[parseInt(body.quantity),body.unit, parseInt(body.recipeId), parseInt(body.mealId)], 
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

RecipeMeal.deleteOne = (body, result) => {

	sql.query(
		'DELETE FROM recipe_meals WHERE recipe_id = ? AND meal_id = ?', [parseInt(body.recipeId), parseInt(body.mealId)], (err, res) => {
		
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}

		console.log('rows affected: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}



module.exports = RecipeMeal;