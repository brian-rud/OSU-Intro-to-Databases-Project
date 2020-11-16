const sql = require('./db');

class Ingredient {
	constructor(ingredientId, name){
		this.ingredientId = ingredientId;
		this.name = name;
	}

	static fromReqBody(reqBody){
		return new Ingredient(
			reqBody.ingredientId,
			reqBody.name
			);
	}

	static fromIngredientDbDto(ingredientDbDto){
		return new Ingredient(
			ingredientDbDto.ingredient_id,
			ingredientDbDto.name
			);
	}
}

class IngredientDbDto {
	constructor(ingredient_id, name){
		this.ingredient_id = ingredient_id;
		this.name = name;
	}
}

Ingredient.fetchAll = result => {
	sql.query('SELECT * FROM ingredients', (err, res) => {
		if(err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}

		ingredientArray = [];
		res.forEach(ingredientDbDto => ingredientArray.push(Ingredient.fromIngredientDbDto(ingredientDbDto)));
		console.log("ingredients: ", ingredientArray);
		result(null, ingredientArray);
	})
}

module.exports = Ingredient;