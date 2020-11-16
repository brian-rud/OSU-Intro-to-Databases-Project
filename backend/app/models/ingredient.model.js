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

		const ingredientArray = [];
		res.forEach(ingredientDbDto => ingredientArray.push(Ingredient.fromIngredientDbDto(ingredientDbDto)));
		console.log("ingredients: ", ingredientArray);
		result(null, ingredientArray);
	})
}

Ingredient.addOne = (body, result) => {
	sql.query('INSERT INTO ingredients (name) VALUES (?)', [body.name], (err, res) => {
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}

		console.log('rows added: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}

Ingredient.updateOne = (body, result) => {
	sql.query('UPDATE ingredients SET name=? WHERE ingredient_id=?', [body.name, parseInt(body.ingredientId)], (err, res) => {
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}

		console.log('rows affected: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}

Ingredient.deleteOne = (body, result) => {
	sql.query('DELETE FROM ingredients WHERE ingredient_id=?', [parseInt(body.ingredientId)], (err, res) => {
		if (err) {
			console.log('Error: ', err)
			result(err, null);
			return
		}

		console.log('rows affected: ', res.affectedRows);
		result(null, res.affectedRows);
	});
}

module.exports = Ingredient;