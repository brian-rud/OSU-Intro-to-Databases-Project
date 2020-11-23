const sql = require("./db");

class Meal {
	constructor(mealId, name) {
		this.mealId = mealId;
		this.name = name;
	}

	static fromReqBody(reqBody) {
		return new Meal(
			reqBody.mealId,
			reqBody.name
			);
	}

	static fromMealDbDto(mealDbDto){
		return new Meal(
			mealDbDto.meal_id,
			mealDbDto.name
			);
	}
}

class MealDbDto {
	constructor(meal_id, name) {
		this.meal_id = meal_id;
		this.name = name;
	}
}
Meal.fetchAll = result => {
	sql.query("SELECT * FROM meals", (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		const mealArray = [];
		res.forEach(mealDbDto => mealArray.push(Meal.fromMealDbDto(mealDbDto)));
		console.log("meals: ", mealArray);
		result(null, res);
	});
}

Meal.fetchOne = (body, result) => {
	sql.query(
		"SELECT * FROM meals WHERE meals.meal_id = ?;",
		[parseInt(body.mealId)],
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}

			const meal = Meal.fromMealDbDto(res[0]);
			console.log("meal: ", meal);
			result(null, res);
	});
}

Meal.addOne = (body, result) => {
	sql.query(
		"INSERT INTO meals (meal_id, name) " +
		"VALUES(?, ?);",
		[
			parseInt(body.mealId),
			body.name,
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

Meal.updateOne = (body, params, result) => {
	sql.query('UPDATE meals SET ? WHERE ?;',
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

Meal.deleteOne = (body, result) => {
	sql.query("DELETE FROM meals WHERE meal_id = ?;", [parseInt(body.mealId)], (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}

		console.log("rows affected", res.affectedRows);
		result(null, res.affectedRows);
	});
}

module.exports = Meal